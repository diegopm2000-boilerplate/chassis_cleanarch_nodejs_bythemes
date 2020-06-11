// bootstrapSequelize.js

const container = require('../../container/container');

const MODULE_NAME = '[bootstrapSequelize]';

exports.init = (config) => {
  container.getLogger().debug(`${MODULE_NAME} initModules (IN) --> config: <<config>>`);

  container.get('sequelizeInfra').init(config.database.sequelize);

  container.getLogger().debug(`${MODULE_NAME} initConfig (OUT) --> initialized`);
};
