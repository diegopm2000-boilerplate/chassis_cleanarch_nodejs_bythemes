// auxGamesystemController.js

const container = require('../../../shared/infrastructure/container/container');
const constants = require('../../../shared/infrastructure/constants/constants');

exports.execute = async (req, res, next, uc) => {
  const options = {
    reqOptions: {
      params: ['gamesystemId'],
    },
    uc,
  };
  container.get(constants.COMMON_HTTP_PROXY_CONTROLLER).execute(req, res, next, options);
};
