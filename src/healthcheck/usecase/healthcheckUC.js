// HealthcheckUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[loadConfigUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({ logger, presenter }) => {
  logger.debug(`${MODULE_NAME} (IN)  -> no params`);

  // Prepare message result
  const innerResult = { message: 'OK' };
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  const result = presenter.presentObject(innerResult);
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
