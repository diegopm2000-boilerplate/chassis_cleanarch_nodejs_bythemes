// getAllGamesystemsController.js

const container = require('../../../shared/infrastructure/container/container');

exports.execute = async (req, res, next) => {
  const options = {
    reqOptions: {},
    uc: 'getAllGamesystemsUC',
  };
  return container.get('commonHttpController').execute(req, res, next, options);
};
