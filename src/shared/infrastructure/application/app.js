// app.js

const _ = require('lodash');

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

// //////////////////////////////////////////////////////////////////////////////
// Private functions
// //////////////////////////////////////////////////////////////////////////////

const initModules = async (config, logger) => {
  logger.debug(`${MODULE_NAME} initModules (IN) --> config: <<config>>, logger: <<logger>>`);
  for (let i = 0; i < config.modules.length; i += 1) {
    const moduleData = config.modules[i];
    logger.debug(`${MODULE_NAME} initModules (MID) --> module to init: ${JSON.stringify(moduleData)}`);
    const module = container.get(`bootstrap${_.upperFirst(moduleData.name)}`);
    if (moduleData.isAsync) {
      // eslint-disable-next-line no-await-in-loop
      await module.init(config);
    } else {
      module.init(config);
    }
  }
  logger.debug(`${MODULE_NAME} initModules (OUT) --> modules initialized OK!`);
};

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
    container.init({ loggerModuleName: 'logColorLogger', loadingMethod: container.LOADING_METHOD_FROM_FOLDER });
    logger.info(`${MODULE_NAME} (MID) --> Container initialized OK`);

    // Init logger
    logger = container.getLogger();
    container.getLogger().init({ level: 'debug' });
    logger.debug(`${MODULE_NAME} (MID) --> Logger initialized OK`);

    // Init Configuration
    const config = await container.get('bootstrapConfig').init(logger);
    logger.debug(`${MODULE_NAME} (MID) --> Config initialized OK: ${JSON.stringify(config)}`);

    // Init Modules
    await initModules(config, logger);

    // Init Sequelize & Models
    // initSequelize(config);

    // Init Api Server
    // await initApiServer(config);

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
