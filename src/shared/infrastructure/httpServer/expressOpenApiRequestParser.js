// expressOpenApiController.js

const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[expressOpenApi RequestParser]';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const loadParametersFromRequest = (req, origin, arrayParamNames) => {
  logger.debug(`${MODULE_NAME} loadParametersFromRequest (IN) --> req: <<req>>, origin: ${origin}, arrayParameterNames: ${JSON.stringify(arrayParamNames)}`);

  const result = {};

  if (arrayParamNames && arrayParamNames.length > 0) {
    arrayParamNames.forEach((x) => {
      result[x] = req[origin][x];
    });
  }

  logger.debug(`${MODULE_NAME} loadPathParamsFromRequest (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const prepareBodyParams = (req, parseFields) => {
  let result = {};
  const bodyParams = loadParametersFromRequest(req, 'body', parseFields.body);
  if (JSON.stringify(bodyParams) !== '{}') {
    if (parseFields.bodyMixToParams) {
      result = { ...result, ...bodyParams };
    } else {
      result.dataIN = bodyParams;
    }
  }
  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.parse = (req, parseFields) => {
  let parsedParams = {};

  parsedParams = { ...parsedParams, ...loadParametersFromRequest(req, 'params', parseFields.params) };
  parsedParams = { ...parsedParams, ...loadParametersFromRequest(req, 'query', parseFields.query) };
  parsedParams = { ...parsedParams, ...loadParametersFromRequest(req, 'headers', parseFields.headers) };
  parsedParams = { ...parsedParams, ...prepareBodyParams(req, parseFields) };

  return parsedParams;
};
