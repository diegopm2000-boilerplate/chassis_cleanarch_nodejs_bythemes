// bootstrapModules.js

const _ = require('lodash');

const container = require('../../container/container');

const MODULE_NAME = '[bootstrapModules]';

exports.init = async (config) => {
  container.getLogger().debug(`${MODULE_NAME} initModules (IN) --> config: <<config>>`);
  for (let i = 0; i < config.modules.length; i += 1) {
    const moduleData = config.modules[i];
    container.getLogger().debug(`${MODULE_NAME} initModules (MID) --> module to init: ${JSON.stringify(moduleData)}`);
    const module = container.get(`bootstrap${_.upperFirst(moduleData.name)}`);
    if (moduleData.isAsync) {
      // eslint-disable-next-line no-await-in-loop
      await module.init(config);
    } else {
      module.init(config);
    }
  }
  container.getLogger().debug(`${MODULE_NAME} initModules (OUT) --> modules initialized OK!`);
};
