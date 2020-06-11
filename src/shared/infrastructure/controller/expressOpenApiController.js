// expressOpenApiController.js

const container = require('../container/container');

const constants = require('../../constants/constants');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[expressOpenApiController]';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const ucCaller = async (usecaseName, params) => {
  const uc = container.get(usecaseName);
  const commonProxyRepository = container.get(constants.COMMON_PROXY_REPOSITORY);
  const commonProxyInfra = container.get(constants.COMMON_PROXY_INFRA);
  const presenter = container.get(constants.HTTP_COMMON_PRESENTER);
  const logger = container.getLogger();

  return uc.execute(commonProxyRepository, commonProxyInfra, presenter, logger, params);
};

const loadParametersFromRequest = (req, origin, arrayParamNames) => {
  container.getLogger().debug(`${MODULE_NAME} loadParametersFromRequest (IN) --> req: <<req>>, origin: ${origin}, arrayParameterNames: ${JSON.stringify(arrayParamNames)}`);

  const result = {};

  if (arrayParamNames && arrayParamNames.length > 0) {
    arrayParamNames.forEach((x) => {
      result[x] = req[origin][x];
    });
  }

  container.getLogger().debug(`${MODULE_NAME} loadPathParamsFromRequest (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const prepareBodyParams = (req, options) => {
  let result = {};
  const bodyParams = loadParametersFromRequest(req, 'body', options.reqOptions.body);
  if (JSON.stringify(bodyParams) !== '{}') {
    if (options.reqOptions.bodyMixToParams) {
      result = { ...result, ...bodyParams };
    } else {
      result.dataIN = bodyParams;
    }
  }
  return result;
};

const prepareParams = (req, options) => {
  let ucParams = {};

  ucParams = { ...ucParams, ...options.inmediateOptions };
  ucParams = { ...ucParams, ...loadParametersFromRequest(req, 'params', options.reqOptions.params) };
  ucParams = { ...ucParams, ...loadParametersFromRequest(req, 'query', options.reqOptions.query) };
  ucParams = { ...ucParams, ...loadParametersFromRequest(req, 'headers', options.reqOptions.headers) };
  ucParams = { ...ucParams, ...prepareBodyParams(req, options) };

  return ucParams;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next, options) => {
  container.getLogger().info(`${MODULE_NAME} (IN) --> req: <<req>>: res: <<res>>, next: <<next>>, options: ${JSON.stringify(options)}`);

  // Prepare params
  const ucParams = prepareParams(req, options);
  container.getLogger().debug(`${MODULE_NAME} (MID) --> ucParams: ${JSON.stringify(ucParams)}`);

  // Call Use Case
  const result = await ucCaller(options.uc, ucParams);

  // Return result
  container.getLogger().info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  res.status(result.code).json(result.data);
};
