// healthcheckUC.js

const MODULE_NAME = '[healthcheck UC]';

exports.execute = async (presenter, logger) => new Promise((resolve) => {
  logger.info(`${MODULE_NAME} (IN) --> no params`);

  const result = presenter.present({ case: presenter.OBJ_PRESENT, obj: { message: 'OK' } });

  logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  resolve(result);
});
