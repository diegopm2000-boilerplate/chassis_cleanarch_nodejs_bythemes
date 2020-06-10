// getConfigController.js

const container = require('../../../shared/infrastructure/container/container');

exports.execute = async (req, res, next) => {
  const options = {
    reqOptions: {},
    inmediateOptions: { finalConfigRepository: 'containerConfigRepository' },
    uc: 'getConfigUC',
  };
  return container.get('commonHttpController').execute(req, res, next, options);
};
