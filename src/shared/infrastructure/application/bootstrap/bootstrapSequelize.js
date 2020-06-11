// bootstrapSequelize.js

const container = require('../../container/container');

exports.init = (config) => {
  container.getSequelizeInfra().init(config.database.sequelize);
};
