// bootstrapConfig.js

const loadConfigController = require('../../../../config/adapter/controller/loadConfigController');
const logger = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[boostrapConfig]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  logger.debug(`${MODULE_NAME} initConfig (IN) --> no params`);

  const config = await loadConfigController.execute();

  logger.debug(`${MODULE_NAME} initConfig (OUT) --> config: ${JSON.stringify(config)}`);
  return config;
};
