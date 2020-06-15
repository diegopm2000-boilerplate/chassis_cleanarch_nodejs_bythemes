// healthcheckUC.js

const MODULE_NAME = '[healthcheck UC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (presenter, logger) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: no params`);

  // Prepare message result
  const innerResult = { message: 'OK' };
  logger.debug(`${MODULE_NAME} (MID) --> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(MODULE_NAME, logger, innerResult);
};
