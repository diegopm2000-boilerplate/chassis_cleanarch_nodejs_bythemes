// healthcheckUC.js

const MODULE_NAME = '[healthcheck UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.info(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Prepare message result
  const innerResult = { message: 'OK' };
  logger.info(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, innerResult);
};
