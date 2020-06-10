// commonProxyRepository

const _ = require('lodash');

const container = require('../container/container');

exports.get = (nameRepository) => {
  if (nameRepository.endsWith('ConfigRepository')) {
    return container.get(nameRepository);
  }

  return container.get(`sequelize${_.upperFirst(nameRepository)}`);
};
