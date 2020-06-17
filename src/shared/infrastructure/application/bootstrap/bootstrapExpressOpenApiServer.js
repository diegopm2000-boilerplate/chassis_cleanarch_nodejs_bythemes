// bootstrapExpressOpenApiServer.js

const constants = require('../../constants/constants');
const expressInfra = require('../../httpServer/expressInfra');
const expressOpenApiInfra = require('../../httpServer/expressOpenApiInfra');
const securityInfra = require('../../httpServer/securityInfra');
const bootstrapControllers = require('./bootstrapControllers');
const logger = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[bootstrapExpressOpenApiServer]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = async (config) => {
  logger.debug(`${MODULE_NAME} init (IN) --> config: ${JSON.stringify(config)}`);

  const {
    port, serverTimeout, enableCors, httpsAlways,
  } = config.express;
  const apiDocFilepath = `${constants.APIDOC_BASEPATH}/${config.api.file}`;

  // Configure Server before Middleware
  expressInfra.configureBeforeApiMiddleware({ serverTimeout, enableCors, apiDocFilepath });
  // Start Express Server
  expressInfra.start(port);
  // Configure Server Security
  securityInfra.init(expressInfra.getApp(), httpsAlways);
  // Boostrap Controllers
  const controllers = bootstrapControllers.init();
  // Add Api Middleware
  expressOpenApiInfra.init(expressInfra.getApp(), apiDocFilepath, controllers);
  // Configure Server after Middleware
  expressInfra.configureAfterApiMiddleware();
  // Get the Express Configuration
  const expressConfig = expressInfra.getExpressConfig();
  logger.debug(`${MODULE_NAME} init (MID) --> expressConfig: ${JSON.stringify(expressConfig)}`);

  logger.debug(`${MODULE_NAME} init (OUT) --> initialized`);
};
