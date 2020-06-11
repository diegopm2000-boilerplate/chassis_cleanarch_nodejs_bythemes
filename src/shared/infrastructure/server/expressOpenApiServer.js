// openapiexpress.js


const expressOpenapi = require('express-openapi');

const getMyKeys = require('uas-get-my-keys');

const bodyParser = require('body-parser');

const container = require('../container/container');
const securityInfra = require('../util/securityInfra');
const fileInfra = require('../util/fileInfra');

const expressInfra = require('./expressInfra');
const errorHandler = require('./errorHandler');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[OpenApiExpress Server]';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

// All operations will be mapped to a controller named <<operationController>>.execute method
const buildOperations = (apiDocumentFilepath) => {
  container.getLogger().debug(`${MODULE_NAME} buildOperations (IN) --> apiDocumentFilepath: ${apiDocumentFilepath}`);

  const result = {};

  const objApiDocument = fileInfra.loadObjFromFileSync(apiDocumentFilepath);
  // Get the operations from apiDocument
  const innerOperationIds = getMyKeys(objApiDocument, ['operationId']);
  const operationIds = innerOperationIds.operationId;
  container.getLogger().debug(`${MODULE_NAME} buildOperations (MID) --> operationIds: ${JSON.stringify(operationIds)}`);

  if (operationIds != null) {
    operationIds.forEach((element) => {
      result[`${element}`] = container.get(`${element}Controller`).execute;
    });
  }

  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.start = async ({
  port,
  apiDocumentFilepath,
  serverTimeout,
  enableCors,
  httpsAlways,
}) => new Promise((resolve, reject) => {
  try {
    container.getLogger().info(`${MODULE_NAME} (IN) --> port: ${port}, apiDocumentFilepath: ${apiDocumentFilepath}, 
    serverTimeout: ${serverTimeout}, enableCors: ${enableCors}, httpsAlways: ${httpsAlways}, privateRouting`);

    // Instance Expresss
    const app = expressInfra.init();
    // Set the server timeout
    const appTimeout = expressInfra.setServerTimeout(app, serverTimeout);
    // Start the server
    const appPort = expressInfra.start(app, port);
    // Init Security
    securityInfra.init(app, httpsAlways);
    // Enable Cors
    expressInfra.enableCors(enableCors);

    // Initialize ExpressOpenApi
    expressOpenapi.initialize({
      app,
      apiDoc: apiDocumentFilepath,
      consumesMiddleware: {
        'application/json': bodyParser.json(),
      },
      errorMiddleware: errorHandler.commonErrorHandler,
      // Put your operation controllers here
      operations: buildOperations(apiDocumentFilepath),
    });

    // Expose documentation using swagger-ui-express
    expressInfra.exposeDoc(app, apiDocumentFilepath);

    // Specific route for handle the 404 route not found
    expressInfra.errorRouteNotFoundHandler(app);

    // Build App Server Status
    const appServerStatus = {
      appPort, enableCors, appTimeout,
    };

    container.getLogger().info(`${MODULE_NAME} (OUT) --> appServerStatus: ${JSON.stringify(appServerStatus)}`);

    resolve(true);
  } catch (error) {
    container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    reject(new Error('Express did not start correctly!'));
  }
});
