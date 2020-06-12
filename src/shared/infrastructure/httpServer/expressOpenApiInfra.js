// expressOpenApiInfra.js

const expressOpenapi = require('express-openapi');
const getMyKeys = require('uas-get-my-keys');
const bodyParser = require('body-parser');

const container = require('../container/container');
const fileInfra = require('../util/fileInfra');
const errorHandler = require('./errorHandler');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[ExpressOpenApi Infra]';

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

  container.getLogger().debug(`${MODULE_NAME} buildOperations (OUT) --> result: <<result>>`);
  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = (app, apiDocFilepath) => {
  container.getLogger().debug(`${MODULE_NAME} init (IN) --> app: <<app>>, apiDocFilepath: ${apiDocFilepath}`);

  expressOpenapi.initialize({
    app,
    apiDoc: apiDocFilepath,
    consumesMiddleware: { 'application/json': bodyParser.json() },
    errorMiddleware: errorHandler.commonErrorHandler,
    operations: buildOperations(apiDocFilepath),
  });

  container.getLogger().debug(`${MODULE_NAME} init (OUT) --> OpenApiExpress Middleware init OK!`);
};
