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
const APIDOCS_PATH = '/api-docs';

let server;
let app;
let expressConfig;

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const setServerTimeout = (serverTimeout) => {
  const appTimeout = serverTimeout || DEFAULT_REQUEST_TIMEOUT;
  app.use(timeout(appTimeout));
  return appTimeout;
};

const setCors = (enable) => {
  if (enable) {
    app.use(cors());
  }
  return enable;
};

const exposeDoc = (apiDocFilepath) => {
  const swaggerDocument = fileInfra.loadObjFromFileSync(apiDocFilepath);
  app.use(APIDOCS_PATH, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

const errorRouteNotFoundHandler = () => {
  app.use(errorHandler.routeNotFoundErrorHandler);
};

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.configureBeforeApiMiddleware = ({ serverTimeout, enableCors, apiDocFilepath }) => {
  container.getLogger().debug(`${MODULE_NAME} configureBeforeApiMiddleware (IN) --> serverTimeout: ${serverTimeout}},
  ebableCors: ${enableCors}, apiDocFiepath: ${apiDocFilepath}`);
  app = express();

  // Set Server Timeout
  const expressTimeout = setServerTimeout(serverTimeout);
  container.getLogger().debug(`${MODULE_NAME} configureBeforeApiMiddleware (MID) --> ServerTimeout to: ${expressTimeout}`);
  // Enable Cors
  const expressCorsEnabled = setCors(enableCors);
  container.getLogger().debug(`${MODULE_NAME} configureBeforeApiMiddleware (MID) --> CORS enabled: ${enableCors}`);
  // Expose documentation using swagger-ui-express
  exposeDoc(apiDocFilepath);
  container.getLogger().debug(`${MODULE_NAME} configureBeforeApiMiddleware (MID) --> Api Documentation exposed in path: ${APIDOCS_PATH}`);
  // Save config options in the module
  expressConfig = { expressTimeout, expressCorsEnabled };

  return app;
};

exports.configureAfterApiMiddleware = () => {
  errorRouteNotFoundHandler();
};

exports.getExpressConfig = () => expressConfig;

exports.getApp = () => app;

exports.start = (port) => {
  container.getLogger().debug(`${MODULE_NAME} start (IN) --> params: port: ${port}`);

  // Set appPort
  const appPort = port || DEFAULT_PORT;
  // Start Server
  server = app.listen(appPort);
  // Save port in config
  expressConfig.appPort = appPort;

  container.getLogger().debug(`${MODULE_NAME} start (OUT) --> App Server started at port: ${appPort}`);
  return appPort;
};

exports.stop = () => {
  container.getLogger().debug(`${MODULE_NAME} stop (IN) --> params: no params`);
  server.close(() => {
    container.getLogger().info(`${MODULE_NAME} stop (OUT) --> server stopped`);
  });
};
