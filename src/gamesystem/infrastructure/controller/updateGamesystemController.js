// updateGamesystemController.js

const container = require('../../../shared/infrastructure/container/container');

exports.execute = async (req, res, next) => {
  const options = {
    reqOptions: {
      params: ['gamesystemId'],
      body: ['name', 'description'],
    },
    uc: 'updateGamesystemUC',
  };
  // TODO sustituir el nombre de commonHttpController por ExpressOpenApiController
  return container.get('commonHttpController').execute(req, res, next, options);
};
