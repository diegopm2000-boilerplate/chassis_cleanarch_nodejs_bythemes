// createGamesystemController.js

const container = require('../../../shared/infrastructure/container/container');

exports.execute = async (req, res, next) => {
  const options = {
    reqOptions: {
      body: ['name', 'description'],
    },
    uc: 'createGamesystemUC',
  };
  return container.get('commonHttpController').execute(req, res, next, options);
};
