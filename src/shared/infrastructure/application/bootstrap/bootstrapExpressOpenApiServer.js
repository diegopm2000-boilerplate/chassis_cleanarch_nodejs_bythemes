// bootstrapExpressOpenApiServer.js

const container = require('../../container/container');
const constants = require('../../constants/constants');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[bootstrapExpressOpenApiServer]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = async (config) => {
  container.getLogger().debug(`${MODULE_NAME} init (IN) --> config: ${JSON.stringify(config)}`);

  const {
    port, serverTimeout, enableCors, httpsAlways,
  } = config.express;
  const apiDocFilepath = `${constants.APIDOC_BASEPATH}/${config.api.file}`;

  const expressInfra = container.get('expressInfra');
  const securityInfra = container.get('securityInfra');

  // Configure Server before Middleware
  expressInfra.configureBeforeApiMiddleware({ serverTimeout, enableCors, apiDocFilepath });
  // Start Express Server
  expressInfra.start(port);
  // Configure Server Security
  securityInfra.init(container.get('expressInfra').getApp(), httpsAlways);
  // Add Api Middleware
  container.get('expressOpenApiInfra').init(container.get('expressInfra').getApp(), apiDocFilepath);
  // Configure Server after Middleware
  expressInfra.configureAfterApiMiddleware();
  // Get the Express Configuration
  const expressConfig = expressInfra.getExpressConfig();
  container.getLogger().debug(`${MODULE_NAME} init (MID) --> expressConfig: ${JSON.stringify(expressConfig)}`);

  container.getLogger().debug(`${MODULE_NAME} init (OUT) --> initialized`);
};
