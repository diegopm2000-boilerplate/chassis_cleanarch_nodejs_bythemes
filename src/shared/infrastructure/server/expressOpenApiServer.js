// openapiexpress.js

const express = require('express');
const expressOpenapi = require('express-openapi');
const timeout = require('connect-timeout');
const getMyKeys = require('uas-get-my-keys');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const container = require('../container/container');
const securityInfra = require('../util/securityInfra');
const fileInfra = require('../util/fileInfra');

const MODULE_NAME = '[OpenApiExpress Server]';

const DEFAULT_PORT = 8080;
const DEFAULT_REQUEST_TIMEOUT = '50s';

let server;

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
    const app = express();

    // Handle the server timeout
    const appTimeout = serverTimeout || DEFAULT_REQUEST_TIMEOUT;
    app.use(timeout(appTimeout));

    // Define the app listen port
    const appPort = port || DEFAULT_PORT;
    server = app.listen(appPort);

    // Init Security
    securityInfra.init(app, httpsAlways);

    // Enable CORS
    if (enableCors) {
      container.getLogger().info(`${MODULE_NAME} (MID) --> Enabling CORS`);
      app.use(cors());
    }

    // Initialize ExpressOpenApi
    expressOpenapi.initialize({
      app,
      apiDoc: apiDocumentFilepath,
      consumesMiddleware: {
        'application/json': bodyParser.json(),
      },
      errorMiddleware: container.get('errorHandler').commonErrorHandler,
      // Put your operation controllers here
      operations: buildOperations(apiDocumentFilepath),
    });

    // Expose documentation using swagger-ui-express
    const swaggerDocument = fileInfra.loadObjFromFileSync(apiDocumentFilepath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Specific route for handle the 404 route not found
    app.use(container.get('errorHandler').routeNotFoundErrorHandler);

    const appServerStatus = {
      appPort,
      enableCors,
      appTimeout,
    };

    container.getLogger().info(`${MODULE_NAME} (OUT) --> appServerStatus: ${JSON.stringify(appServerStatus)}`);

    resolve(true);
  } catch (error) {
    container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    reject(new Error('Express did not start correctly!'));
  }
});

exports.stop = () => {
  server.close(() => { container.getLogger().info('App Server stopped'); });
};
