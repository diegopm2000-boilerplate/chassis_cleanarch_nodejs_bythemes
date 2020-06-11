// bootstrapExpressOpenApiServer.js

const container = require('../../container/container');
const constants = require('../../../constants/constants');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[bootstrapExpressOpenApiServer';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = async (config) => {
  container.getLogger().debug(`${MODULE_NAME} init (IN) --> config: <<config>>`);

  const options = {
    port: config.express.port,
    apiDocumentFilepath: `${constants.APIDOC_BASEPATH}/${config.api.file}`,
    serverTimeout: config.express.timeout,
    enableCors: config.express.enableCors,
    httpsAlways: config.express.httpsAlways,
  };

  // Start api server
  await container.get('expressOpenApiServer').start(options);
  container.getLogger().debug(`${MODULE_NAME} initConfig (OUT) --> initialized`);
};
