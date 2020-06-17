// logFacade.js

// const logger = require('./consoleLogger');
// const logger = require('./logColorLogger');
const logger = require('./logWinston');

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.defaultInit = () => {
  logger.defaultInit();
};

exports.init = (options) => {
  logger.init(options);
};

exports.error = (message) => {
  logger.error(message);
};

exports.warning = (message) => {
  logger.warning(message);
};

exports.info = (message) => {
  logger.info(` ${message}`);
};

exports.debug = (message) => {
  logger.debug(message);
};
