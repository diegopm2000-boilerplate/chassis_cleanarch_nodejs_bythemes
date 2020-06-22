// bootstrapModules.js

const _ = require('lodash');

const logger = require('../../log/logFacade');

const bootstrapSequelize = require('./bootstrapSequelize');
const bootstrapExpressOpenApiServer = require('./bootstrapExpressOpenApiServer');
const bootstrapAuthentication = require('./bootstrapAuthentication');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[bootstrapModules]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO arreglar esto para que los coja al vuelo en lugar de tener que declararlos aquí

exports.init = async (config) => {
  logger.debug(`${MODULE_NAME} initModules (IN) --> config: <<config>>`);

  const modules = {
    bootstrapSequelize,
    bootstrapExpressOpenApiServer,
    bootstrapAuthentication,
  };

  for (let i = 0; i < config.modules.length; i += 1) {
    const moduleData = config.modules[i];
    logger.debug(`${MODULE_NAME} initModules (MID) --> module to init: ${JSON.stringify(moduleData)}`);
    const module = modules[`bootstrap${_.upperFirst(moduleData.name)}`];

    if (!module) {
      throw new Error('Bootstrap module not found!');
    }

    if (moduleData.isAsync) {
      // eslint-disable-next-line no-await-in-loop
      await module.init(config);
    } else {
      module.init(config);
    }
  }
  logger.debug(`${MODULE_NAME} initModules (OUT) --> modules initialized OK!`);
};
