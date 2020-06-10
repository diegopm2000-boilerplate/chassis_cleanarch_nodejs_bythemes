// app.js

const container = require('../container/container');

const apiserver = require('../server/openapiexpress');

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[App]';

// Config sources
const YAML_FILE = 'YAML_FILE';
const GIT = 'GIT';

const APIDOC_BASEPATH = './src/shared/infrastructure/api';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const loadEnvVars = () => {
  const funcName = loadEnvVars.name;
  container.getLogger().debug(`${MODULE_NAME}${funcName} (IN) --> no params`);

  const result = {
    configSource: process.env.NODE_CONFIG_SOURCE_APP,
    configFileName: process.env.NODE_CONFIG_FILE,
    configPort: process.env.NODE_CONFIG_PORT_APP,
    apiDoc: process.env.NODE_CONFIG_APIFILE,
    configSpringCfg: process.env.NODE_CONFIG_SPRINGCFG_ENDPOINT,
  };

  container.getLogger().debug(`${MODULE_NAME}${funcName} (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};

// TODO habría que montar un controlador para esto

const initConfig = async (envVars, logger) => {
  const funcName = initConfig.name;
  logger.debug(`${MODULE_NAME}:${funcName} (IN) --> envVars: ${JSON.stringify(envVars)}`);

  if (envVars.configSource !== YAML_FILE && envVars.configSource !== GIT) {
    const msgError = 'Config Source not valid';
    logger.error(`${MODULE_NAME}:${funcName} (ERROR) --> error.message: ${msgError}`);
    throw new Error(msgError);
  }

  const endpoint = envVars.configSpringCfg;
  const initialConfigRepository = (YAML_FILE === envVars.configSource) ? 'fileConfigRepository' : 'remoteConfigRepository';
  const filename = envVars.configFileName;
  const loadConfigUC = container.get('loadConfigUC');

  const repository = container.get('commonProxyRepository');
  const infra = container.get('commonProxyInfra');
  const presenter = container.get('objectPresenter');

  const params = {
    filename,
    endpoint,
    initialConfigRepository,
    finalConfigRepository: 'containerConfigRepository',
  };

  const config = await loadConfigUC.execute(repository, infra, presenter, logger, params);

  logger.debug(`${MODULE_NAME}:${funcName} (OUT) --> config: ${JSON.stringify(config)}`);
  return config;
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

    // Init Environment Variables
    const envVars = loadEnvVars();

    // Init Container
    container.init({ loggerModuleName: 'logColorLogger', loadingMethod: container.LOADING_METHOD_FROM_FOLDER });
    logger.info(`${MODULE_NAME} (MID) --> Container initialized OK`);

    // Init logger
    logger = container.getLogger();
    container.getLogger().init({ level: 'debug' });
    logger.debug(`${MODULE_NAME} (MID) --> Logger initialized OK`);

    // Init Configuration
    const config = await initConfig(envVars, logger);
    logger.debug(`${MODULE_NAME} (MID) --> Config initialized OK: ${JSON.stringify(config)}`);

    // Init Sequelize & Models
    container.getSequelizeInfra().init(config.database);

    // Init jwtInfra
    container.get('jwtInfra').init(config.authentication);

    // options passed to apiserver
    const options = {
      port: envVars.configPort,
      apiDocumentFilepath: `${APIDOC_BASEPATH}/${envVars.apiDoc}`,
      serverTimeout: config.express.timeout,
      enableCors: config.express.enableCors,
      httpsAlways: config.express.httpsAlways,
      privateRouting: config.express.privateRouting,
    };

    // Start api server
    await apiserver.start(options);

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
