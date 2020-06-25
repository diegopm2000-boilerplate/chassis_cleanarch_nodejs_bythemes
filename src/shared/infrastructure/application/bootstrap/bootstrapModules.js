// bootstrapModules.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const _ = require('lodash');

const logger = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[bootstrapModules]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO arreglar esto para que los coja al vuelo en lugar de tener que declararlos aquí

exports.init = async (config) => {
  logger.debug(`${MODULE_NAME} init (IN) --> config: <<config>>`);

  for (let i = 0; i < config.modules.length; i += 1) {
    const moduleData = config.modules[i];
    logger.debug(`${MODULE_NAME} init (MID) --> module to init: ${JSON.stringify(moduleData)}`);

    const module = require(`./bootstrap${_.upperFirst(moduleData.name)}`);
    logger.debug(`${MODULE_NAME} init (MID) --> module loaded ok!`);

    if (moduleData.isAsync) {
      // eslint-disable-next-line no-await-in-loop
      await module.init(config);
    } else {
      module.init(config);
    }
  }
  logger.debug(`${MODULE_NAME} init (OUT) --> modules initialized OK!`);
};
