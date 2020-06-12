// app.js

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

// //////////////////////////////////////////////////////////////////////////////
// Unhandled Rejection Handler
// //////////////////////////////////////////////////////////////////////////////

process.on('unhandledRejection', (err, p) => {
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> An unhandledRejection occurred...`);
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> Rejected Promise: ${p}`);
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> Rejection: ${err}`);
});

// //////////////////////////////////////////////////////////////////////////////
// Init
// //////////////////////////////////////////////////////////////////////////////

exports.init = async () => {
  let logger;
  try {
    // Init container with default logger
    container.defaultInit();
    logger = container.getLogger();
    logger.info(`${MODULE_NAME} (IN) --> Initializing Application...`);

    // Init Container
    container.init('logColorLogger');
    logger.info(`${MODULE_NAME} (MID) --> Container initialized OK`);

    // Init logger
    logger = container.getLogger();
    container.getLogger().init({ level: 'debug' });
    logger.info(`${MODULE_NAME} (MID) --> Logger initialized OK`);

    // Init Configuration
    const config = await container.get('bootstrapConfig').init();
    logger.info(`${MODULE_NAME} (MID) --> Config initialized OK: ${JSON.stringify(config)}`);

    // Init Modules
    await container.get('bootstrapModules').init(config);

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
