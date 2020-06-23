// expressOpenApiInfra.js

const expressOpenapi = require('express-openapi');
const getMyKeys = require('uas-get-my-keys');
const bodyParser = require('body-parser');

const fileInfra = require('../util/fileInfra');
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
  const result = innerOperationIds.operationId;

  logger.debug(`${MODULE_NAME} getOperationIds (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const getControllers = () => {
  logger.debug(`${MODULE_NAME} getControllers (IN) --> no params`);

  let result = {};

  logger.debug(`${MODULE_NAME} getControllers (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const buildOperations = (apiDocumentFilepath) => {
  logger.debug(`${MODULE_NAME} buildOperations (IN) --> apiDocumentFilepath: ${apiDocumentFilepath}`);

  const result = {};

  const operationIds = getOperationIds(apiDocumentFilepath);
  const controllers = getControllers();

  // if (operationIds != null) {
  //   if (Array.isArray(operationIds)) {
  //     operationIds.forEach((element) => {
  //       // result[`${element}`] = container.get(`${element}Controller`).execute;
  //       result[`${element}`] = controllers[`${element}Controller`].execute.bind(controllers[`${element}Controller`]);
  //     });
  //   } else {
  //     result[`${operationIds}`] = controllers[`${operationIds}Controller`].execute.bind(controllers[`${operationIds}Controller`]);
  //   }
  // }

  logger.debug(`${MODULE_NAME} buildOperations (OUT) --> result: <<result>>`);
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
  };

  const operations = buildOperations(apiDocFilepath);
  if (JSON.stringify(operations) !== '{}') {
    options.operations = operations;
  }

  expressOpenapi.initialize(options);

  logger.debug(`${MODULE_NAME} init (OUT) --> OpenApiExpress Middleware init OK!`);
};
