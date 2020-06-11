// bootstrapExpressOpenApiServer.js

const container = require('../../container/container');
const constants = require('../../../constants/constants');

exports.init = async (config) => {
  // options passed to apiserver
  const options = {
    port: config.express.port,
    apiDocumentFilepath: `${constants.APIDOC_BASEPATH}/${config.api.file}`,
    serverTimeout: config.express.timeout,
    enableCors: config.express.enableCors,
    httpsAlways: config.express.httpsAlways,
  };

  // Start api server
  await container.get('expressOpenApiServer').start(options);
};
