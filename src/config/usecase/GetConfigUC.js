// GetConfigUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[loadConfigUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

// TODO no quiero clases, así que el presenter y el repository han de ser modulos!!!

exports.execute = async ({ logger, presenter, Repository }) => {
  logger.debug(`${MODULE_NAME} (IN) -> no params`);

  // Get Config from repository
  const innerResult = await Repository.get();
  logger.debug(`${MODULE_NAME} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  // Build & Return result
  return presenter.presentObject(innerResult);
};
