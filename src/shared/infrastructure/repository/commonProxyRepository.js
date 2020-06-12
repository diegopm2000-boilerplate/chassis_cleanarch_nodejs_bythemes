// commonProxyRepository

const _ = require('lodash');

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.get = (nameRepository) => {
  if (nameRepository.endsWith('ConfigRepository')) {
    return container.get(nameRepository);
  }

  if (nameRepository === 'bootstrapRepository') {
    return container.get('envVarsBootstrapRepository');
  }

  return container.get(`sequelize${_.upperFirst(nameRepository)}`);
};
