// app.js

const logger = require('../log/logFacade');
const bootstrapconfig = require('./bootstrap/bootstrapConfig');
const bootstrapModules = require('./bootstrap/bootstrapModules');
// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

// //////////////////////////////////////////////////////////////////////////////
// Unhandled Rejection Handler
// //////////////////////////////////////////////////////////////////////////////

process.on('unhandledRejection', (err, p) => {
  logger.error(`${MODULE_NAME} (ERROR) --> An unhandledRejection occurred...`);
  logger.error(`${MODULE_NAME} (ERROR) --> Rejected Promise: ${p}`);
  logger.error(`${MODULE_NAME} (ERROR) --> Rejection: ${err}`);
});

// //////////////////////////////////////////////////////////////////////////////
// Init
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  try {
    // // Init logger
    logger.defaultInit({ level: 'debug' });
    logger.info(`${MODULE_NAME} (MID) --> Logger initialized OK`);

    // Init Configuration
    const config = await bootstrapconfig.init();
    logger.info(`${MODULE_NAME} (MID) --> Config initialized OK: ${JSON.stringify(config)}`);

    // Init Modules
    await bootstrapModules.init(config);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${true}`);
    return true;
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) --> error: ${error.stack}`);
    return false;
  }
};

require('make-runnable/custom')({
  printOutputFrame: false,
});
