// expressOpenApiController.js

const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[expressOpenApi RequestParser]';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const fixBodyParams = (bodyParams, bodyMixToParams) => {
  let result = {};
  if (JSON.stringify(bodyParams) !== '{}') {
    if (bodyMixToParams) {
      result = { ...result, ...bodyParams };
    } else {
      result.dataIN = bodyParams;
    }
  }
  return result;
};

const loadParametersFromRequest = (req, origin, parseFields) => {
  // logger.debug(`${MODULE_NAME} loadParametersFromRequest (IN) --> req: <<req>>, origin: ${origin}, arrayParameterNames: ${JSON.stringify(arrayParamNames)}`);

  let result = {};

  const arrayParamNames = parseFields[origin];

  if (arrayParamNames && arrayParamNames.length > 0) {
    arrayParamNames.forEach((x) => {
      result[x] = req[origin][x];
    });
  }

  if (origin === 'body') {
    result = fixBodyParams(result, parseFields.bodyMixToParams);
  }

  // logger.debug(`${MODULE_NAME} loadPathParamsFromRequest (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.parse = (req, parseFields) => {
  logger.debug(`${MODULE_NAME} parse (IN) --> req: <<req>>, parseFields: ${JSON.stringify(parseFields)}`);

  let result = {};

  result = { ...result, ...loadParametersFromRequest(req, 'params', parseFields) };
  result = { ...result, ...loadParametersFromRequest(req, 'query', parseFields) };
  result = { ...result, ...loadParametersFromRequest(req, 'headers', parseFields) };
  result = { ...result, ...loadParametersFromRequest(req, 'body', parseFields) };

  logger.debug(`${MODULE_NAME} parse (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
