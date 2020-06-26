// expressOpenApiInfra.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const expressOpenapi = require('express-openapi');
const getMyKeys = require('uas-get-my-keys');
const bodyParser = require('body-parser');
const glob = require('glob');

const fileInfra = require('../util/fileInfra');
const moduleInfra = require('../util/moduleInfra');
const errorHandler = require('./errorHandler');
const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[ExpressOpenApi Infra]';

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const getOperationIds = (apiDocumentFilepath) => {
  logger.debug(`${MODULE_NAME} getOperationIds (IN) --> apiDocumentFilepath: ${apiDocumentFilepath}`);

  const objApiDocument = fileInfra.loadObjFromFileSync(apiDocumentFilepath);
  // Get the operations from apiDocument
  const innerOperationIds = getMyKeys(objApiDocument, ['operationId']);

  const innerResult = innerOperationIds.operationId;

  let result;
  if (!innerResult) {
    result = [];
  } else if (!Array.isArray(innerResult)) {
    result = [innerResult];
  } else {
    result = innerResult;
  }

  logger.debug(`${MODULE_NAME} getOperationIds (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const getControllers = () => {
  logger.debug(`${MODULE_NAME} getControllers (IN) --> no params`);

  const result = glob.sync('src/**/*Controller.js');

  logger.debug(`${MODULE_NAME} getControllers (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const buildOperations = (apiDocumentFilepath) => {
  logger.debug(`${MODULE_NAME} buildOperations (IN) --> apiDocumentFilepath: ${apiDocumentFilepath}`);

  const result = {};

  const operationIds = getOperationIds(apiDocumentFilepath);
  const controllers = getControllers();

  operationIds.forEach((element) => {
    logger.debug(`${MODULE_NAME} buildOperations (MID) --> element: ${element}`);

    // Get the controller associated
    const controllerFileFound = controllers.find((x) => x.endsWith(`${element}Controller.js`));
    logger.debug(`${MODULE_NAME} buildOperations (MID) --> controllerFileFound: ${controllerFileFound}`);
    const module = moduleInfra.loadModule(controllerFileFound);

    result[element] = module.execute;
    logger.debug(`${MODULE_NAME} buildOperations (MID) --> operationId: ${element} binded with the controller module execute operation`);
  });

  logger.debug(`${MODULE_NAME} buildOperations (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (app, apiDocFilepath) => {
  logger.debug(`${MODULE_NAME} init (IN) --> app: <<app>>, apiDocFilepath: ${apiDocFilepath}`);

  const options = {
    app,
    apiDoc: apiDocFilepath,
    consumesMiddleware: { 'application/json': bodyParser.json() },
    errorMiddleware: errorHandler.commonErrorHandler,
    operations: buildOperations(apiDocFilepath),
  };

  expressOpenapi.initialize(options);

  logger.debug(`${MODULE_NAME} init (OUT) --> OpenApiExpress Middleware init OK!`);
};
