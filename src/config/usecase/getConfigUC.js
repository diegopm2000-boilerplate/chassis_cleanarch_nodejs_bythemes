// getConfigUC.js UseCase

const MODULE_NAME = '[getConfig UC]';

exports.execute = async (commonProxyRepository, commonProxyInfra, presenter, logger, params) => {
  logger.info(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // IN parameters
  const { finalConfigRepository } = params;

  const innerResult = await commonProxyRepository.get(finalConfigRepository).getConfig();
  logger.info(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, innerResult);
};
