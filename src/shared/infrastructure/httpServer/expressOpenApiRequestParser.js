// expressOpenApiController.js

const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[expressOpenApi RequestParser]';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const mixObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

const loadParametersFromRequest = (req, origin, fieldsToParse) => {
  // logger.debug(`${MODULE_NAME} loadParametersFromRequest (IN) --> req: <<req>>, origin: ${origin}, arrayParameterNames: ${JSON.stringify(arrayParamNames)}`);

  const result = {};

  const arrayParamNames = fieldsToParse[origin] || [];

  arrayParamNames.forEach((x) => {
    result[x] = req[origin][x];
  });

  // logger.debug(`${MODULE_NAME} loadPathParamsFromRequest (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const flatBodyParamsToDataIN = (bFlat, params) => ((bFlat) ? params : { dataIN: params });

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.parse = (req, fieldsToParse) => {
  logger.debug(`${MODULE_NAME} parse (IN) --> req: <<req>>, parseFields: ${JSON.stringify(fieldsToParse)}`);

  let result = {};

  result = mixObjects(result, loadParametersFromRequest(req, 'params', fieldsToParse));
  result = mixObjects(result, loadParametersFromRequest(req, 'query', fieldsToParse));
  result = mixObjects(result, loadParametersFromRequest(req, 'headers', fieldsToParse));
  result = mixObjects(result, flatBodyParamsToDataIN(fieldsToParse.bFlat, loadParametersFromRequest(req, 'body', fieldsToParse)));

  logger.debug(`${MODULE_NAME} parse (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
