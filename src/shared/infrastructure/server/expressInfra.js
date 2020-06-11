// expressHandler.js

const express = require('express');
const timeout = require('connect-timeout');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const container = require('../container/container');
const fileInfra = require('../util/fileInfra');
const errorHandler = require('./errorHandler');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Express Infra]';

const DEFAULT_REQUEST_TIMEOUT = '50s';
const DEFAULT_PORT = 8080;

let server;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = () => {
  const app = express();
  return app;
};

exports.setServerTimeout = (app, serverTimeout) => {
  const appTimeout = serverTimeout || DEFAULT_REQUEST_TIMEOUT;
  app.use(timeout(appTimeout));

  container.getLogger().info(`${MODULE_NAME} (MID) --> ServerTimeout to: ${appTimeout}`);
  return appTimeout;
};

exports.enableCors = (app, enableCors) => {
  if (enableCors) {
    container.getLogger().info(`${MODULE_NAME} (MID) --> Enabling CORS`);
    app.use(cors());
  }
};

exports.exposeDoc = (app, apiDocumentFilepath) => {
  const swaggerDocument = fileInfra.loadObjFromFileSync(apiDocumentFilepath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

exports.errorRouteNotFoundHandler = (app) => {
  app.use(errorHandler.routeNotFoundErrorHandler);
};

exports.start = (app, port) => {
  const appPort = port || DEFAULT_PORT;
  server = app.listen(appPort);
  return appPort;
};

exports.stop = () => {
  server.close(() => { container.getLogger().info('App Server stopped'); });
};
