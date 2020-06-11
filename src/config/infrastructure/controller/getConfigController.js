// getConfigController.js

const container = require('../../../shared/infrastructure/container/container');
const constants = require('../../../shared/constants/constants');

exports.execute = async (req, res, next) => {
  try {
    const options = {
      reqOptions: {},
      inmediateOptions: { finalConfigRepository: 'containerConfigRepository' },
      uc: 'getConfigUC',
    };
    container.get(constants.COMMON_HTTP_PROXY_CONTROLLER).execute(req, res, next, options);
  } catch (err) {
    container.getLogger().error(err.stack);
    next(new Error('Internal Error'));
  }
};
