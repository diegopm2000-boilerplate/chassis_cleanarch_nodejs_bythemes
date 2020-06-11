// openapiexpress.js

const express = require('express');
const expressOpenapi = require('express-openapi');
const timeout = require('connect-timeout');
const getMyKeys = require('uas-get-my-keys');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const container = require('../container/container');
const security = require('../security/security');
const fileInfra = require('../util/fileInfra');

const MODULE_NAME = '[OpenApiExpress Server]';

const DEFAULT_PORT = 8080;
const DEFAULT_REQUEST_TIMEOUT = '50s';

let server;

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${err.stack}`);

  const status = (err.status) ? err.status : 500;
  const errorObj = { code: status, message: err.message };
  res.status(status).json(errorObj);
};

// eslint-disable-next-line no-unused-vars
const routeNotFoundErrorHandler = (req, res, next) => {
  const errorObj = { code: 404, message: `Cannot ${req.method} ${req.path}` };
  res.status(404).json(errorObj);
};

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
    security.init(app, httpsAlways);

    // Enable CORS
    if (enableCors) {
      container.getLogger().info(`${MODULE_NAME} (MID) --> Enabling CORS`);
      app.use(cors());
    }

    // Build Operations
    const operations = buildOperations(apiDocumentFilepath);

    // Initialize ExpressOpenApi
    expressOpenapi.initialize({
      app,
      apiDoc: apiDocumentFilepath,
      consumesMiddleware: {
        'application/json': bodyParser.json(),
      },
      errorMiddleware: errorHandler,
      // Put your operation controllers here
      operations,
    });

    // Expose documentation using swagger-ui-express
    const swaggerDocument = fileInfra.loadObjFromFileSync(apiDocumentFilepath);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Specific route for handle the 404 route not found
    app.use(routeNotFoundErrorHandler);

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
