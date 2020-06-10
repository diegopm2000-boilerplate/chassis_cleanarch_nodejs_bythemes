// objectPresenter.js

exports.presentObject = (moduleName, logger, object) => {
  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(object)}`);
  return object;
};
