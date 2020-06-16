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

const buildOperations = (apiDocumentFilepath, controllers) => {
  container.getLogger().debug(`${MODULE_NAME} buildOperations (IN) --> apiDocumentFilepath: ${apiDocumentFilepath}, controllers: <<controllers>>`);

  const result = {};

  const objApiDocument = fileInfra.loadObjFromFileSync(apiDocumentFilepath);
  // Get the operations from apiDocument
  const innerOperationIds = getMyKeys(objApiDocument, ['operationId']);
  const operationIds = innerOperationIds.operationId;
  container.getLogger().debug(`${MODULE_NAME} buildOperations (MID) --> operationIds: ${JSON.stringify(operationIds)}`);

  if (operationIds != null) {
    if (Array.isArray(operationIds)) {
      operationIds.forEach((element) => {
        // result[`${element}`] = container.get(`${element}Controller`).execute;
        result[`${element}`] = controllers[`${element}Controller`].execute.bind(controllers[`${element}Controller`]);
      });
    } else {
      result[`${operationIds}`] = controllers[`${operationIds}Controller`].execute.bind(controllers[`${operationIds}Controller`]);
    }
  }

  container.getLogger().debug(`${MODULE_NAME} buildOperations (OUT) --> result: <<result>>`);
  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = (app, apiDocFilepath, controllers) => {
  container.getLogger().debug(`${MODULE_NAME} init (IN) --> app: <<app>>, apiDocFilepath: ${apiDocFilepath}`);

  expressOpenapi.initialize({
    app,
    apiDoc: apiDocFilepath,
    consumesMiddleware: { 'application/json': bodyParser.json() },
    errorMiddleware: errorHandler.commonErrorHandler,
    operations: buildOperations(apiDocFilepath, controllers),
  });

  container.getLogger().debug(`${MODULE_NAME} init (OUT) --> OpenApiExpress Middleware init OK!`);
};
