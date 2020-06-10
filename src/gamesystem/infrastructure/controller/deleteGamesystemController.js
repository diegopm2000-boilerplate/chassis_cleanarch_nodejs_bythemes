// deleteGamesystemController.js

const container = require('../../../shared/infrastructure/container/container');

exports.execute = async (req, res, next) => {
  const options = {
    reqOptions: {
      params: ['gamesystemId'],
    },
    uc: 'deleteGamesystemUC',
  };
  return container.get('commonHttpController').execute(req, res, next, options);
};
