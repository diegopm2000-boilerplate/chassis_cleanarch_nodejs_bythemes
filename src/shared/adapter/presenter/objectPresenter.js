// objectPresenter.js

exports.presentObject = (moduleName, logger, object) => {
  logger.info(`${moduleName} (OUT) --> result: ${JSON.stringify(object)}`);
  return object;
};
