// bootstrapModules.js

const _ = require('lodash');

const logger = require('../../log/logFacade');

const bootstrapSequelize = require('./bootstrapSequelize');
const bootstrapExpressOpenApiServer = require('./bootstrapExpressOpenApiServer');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[bootstrapModules]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = async (config) => {
  logger.debug(`${MODULE_NAME} initModules (IN) --> config: <<config>>`);

  const modules = {
    bootstrapSequelize,
    bootstrapExpressOpenApiServer,
  };

  for (let i = 0; i < config.modules.length; i += 1) {
    const moduleData = config.modules[i];
    logger.debug(`${MODULE_NAME} initModules (MID) --> module to init: ${JSON.stringify(moduleData)}`);
    const module = modules[`bootstrap${_.upperFirst(moduleData.name)}`];
    if (moduleData.isAsync) {
      // eslint-disable-next-line no-await-in-loop
      await module.init(config);
    } else {
      module.init(config);
    }
  }
  logger.debug(`${MODULE_NAME} initModules (OUT) --> modules initialized OK!`);
};
