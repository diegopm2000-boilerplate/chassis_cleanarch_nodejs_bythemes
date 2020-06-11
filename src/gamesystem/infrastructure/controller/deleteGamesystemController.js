// deleteGamesystemController.js

const container = require('../../../shared/infrastructure/container/container');
const constants = require('../../../shared/constants/constants');

exports.execute = async (req, res, next) => {
  const options = {
    reqOptions: {
      params: ['gamesystemId'],
    },
    uc: 'deleteGamesystemUC',
  };
  return container.get(constants.COMMON_HTTP_PROXY_CONTROLLER).execute(req, res, next, options);
};
