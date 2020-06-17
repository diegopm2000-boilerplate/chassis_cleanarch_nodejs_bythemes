// LoadConfigUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class LoadConfigUC extends BaseUC {
  async execute() {
    super.logIn('no params');

    // Load bootstrap variables from bootstrap Repository
    const bootstrapEnvVars = await this.repositories.bootstrap.load();
    super.logMid(`bootstrapEnvVars: ${JSON.stringify(bootstrapEnvVars)}`);

    // Check the configSource
    if (bootstrapEnvVars.configSource !== 'YAML_FILE' && bootstrapEnvVars.configSource !== 'GIT') {
      const msgError = 'Config Source not valid';
      super.logError(`error.message: ${msgError}`);
      throw new Error(msgError);
    }

    let config;
    if (bootstrapEnvVars.configSource === 'YAML_FILE') {
      config = await this.repositories.originPrimary.get({ filename: bootstrapEnvVars.configFileName });
    } else {
      config = await this.repositories.originSecondary.get({ filename: bootstrapEnvVars.configFileName, endpoint: bootstrapEnvVars.endpoint });
    }
    super.logMid(`config: ${JSON.stringify(config)}`);

    // Save config to destiny repository
    await this.repositories.destiny.set({ data: config });
    super.logMid('config stored in destiny Repository');

    // Build & Return result
    return super.presentObject(config);
  }
}

module.exports = LoadConfigUC;
