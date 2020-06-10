// commonHttpController.js

const container = require('../container/container');

const constants = require('../../constants/constants');

const MODULE_NAME = '[commonHttpController]';

const ucCaller = async (options) => {
  container.getLogger().debug(`${MODULE_NAME} (IN) --> options: ${JSON.stringify(options)}`);

  const uc = container.get(options.uc);
  const commonProxyRepository = container.get(options.repository);
  const commonProxyInfra = container.get(options.infra);
  const presenter = container.get(options.presenter);
  const logger = container.getLogger();
  const { params } = options;

  const result = await uc.execute(commonProxyRepository, commonProxyInfra, presenter, logger, params);
  return result;
};

const getUserSessionInfo = (infra, tokenRaw) => {
  const commonProxyInfra = container.get(infra);
  const token = commonProxyInfra.get('jwtInfra').cleanToken(tokenRaw);
  if (token == null) {
    // TODO habría que ver como devolver mejor este error
    throw Error('Token not valid');
  }
  // Extract administratorInfo from token
  const result = commonProxyInfra.get('jwtInfra').getUserInfoFromToken(token);
  return result;
};

const loadParametersFromRequest = (req, origin, arrayParameterNames) => {
  container.getLogger().debug(`${MODULE_NAME} loadParametersFromRequest (IN) --> 
  req: <<req>>, origin: ${origin}, arrayParameterNames: ${JSON.stringify(arrayParameterNames)}`);

  const result = {};

  if (arrayParameterNames && arrayParameterNames.length > 0) {
    arrayParameterNames.forEach((x) => {
      result[x] = req[origin][x];
    });
  }

  container.getLogger().debug(`${MODULE_NAME} loadPathParamsFromRequest (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

exports.execute = async (req, res, next, options) => {
  try {
    container.getLogger().info(`${MODULE_NAME} (IN) --> req: <<req>>: res: <<res>>, next: <<next>>, options: ${JSON.stringify(options)}`);

    // TODO mejorar esto, esta un poco de aquella manera

    let ucParams = loadParametersFromRequest(req, 'params', options.reqOptions.params);

    const queryParams = loadParametersFromRequest(req, 'query', options.reqOptions.query);
    if (queryParams) {
      ucParams = { ...ucParams, ...queryParams };
    }

    const inmediateParams = options.inmediateOptions;
    if (inmediateParams) {
      ucParams = { ...ucParams, ...inmediateParams };
    }

    const headerParams = loadParametersFromRequest(req, 'headers', options.reqOptions.headers);
    if (headerParams) {
      ucParams = { ...ucParams, ...headerParams };
    }

    if (options.reqOptions.secured) {
      const headers = loadParametersFromRequest(req, 'headers', [constants.TOKEN_NAME]);
      const userSessionInfo = getUserSessionInfo('commonProxyInfra', headers[constants.TOKEN_NAME]);
      ucParams.userSessionInfo = userSessionInfo;
    }

    if (options.reqOptions.body && options.reqOptions.body.length > 0) {
      const bodyParams = loadParametersFromRequest(req, 'body', options.reqOptions.body);
      if (options.reqOptions.bodyMixToParams) {
        ucParams = { ...ucParams, ...bodyParams };
      } else {
        ucParams.dataIN = bodyParams;
      }
    }

    container.getLogger().debug(`${MODULE_NAME} (MID) --> params from req: ucParams: ${JSON.stringify(ucParams)}`);

    const ucCallerOptions = {
      uc: options.uc,
      repository: 'commonProxyRepository',
      infra: 'commonProxyInfra',
      presenter: 'httpObjectPresenter',
      params: ucParams,
    };

    const result = await ucCaller(ucCallerOptions);

    container.getLogger().info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (error) {
    container.getLogger().error(error.stack);
    next(new Error('Internal Error'));
  }
};
