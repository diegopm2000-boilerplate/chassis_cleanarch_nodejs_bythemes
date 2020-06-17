// LoadConfigUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class LoadConfigUC extends BaseUC {
  async execute(params) {
    super.logIn(this.constructor.name, params);

    // Load bootstrap variables from bootstrap Repository
    const bootstrapEnvVars = await this.repositories.bootstrap.load();
    super.logMid(this.constructor.name, `bootstrapEnvVars: ${JSON.stringify(bootstrapEnvVars)}`);

    // Check the configSource
    if (bootstrapEnvVars.configSource !== 'YAML_FILE' && bootstrapEnvVars.configSource !== 'GIT') {
      const msgError = 'Config Source not valid';
      this.logger.error(`${this.constructor.name} (ERROR) --> error.message: ${msgError}`);
      throw new Error(msgError);
    }

    let config;
    if (bootstrapEnvVars.configSource === 'YAML_FILE') {
      config = await this.repositories.originPrimary.get({ filename: bootstrapEnvVars.configFileName });
    } else {
      config = await this.repositories.originSecondary.get({ filename: bootstrapEnvVars.configFileName, endpoint: bootstrapEnvVars.endpoint });
    }
    this.logger.debug(`${this.constructor.name} (MID) --> config: ${JSON.stringify(config)}`);

    // Save config to destiny repository
    await this.repositories.destiny.set({ data: config });
    this.logger.debug(`${this.constructor.name} (MID) --> config stored in destiny Repository`);

    // Build & Return result
    return this.presenter.presentObject(this.constructor.name, this.logger, config);
  }
}

module.exports = LoadConfigUC;
