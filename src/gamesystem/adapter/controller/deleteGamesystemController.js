// deleteGamesystemController.js

const container = require('../../../shared/infrastructure/container/container');

exports.execute = async (req, res, next) => {
  try {
    container.get('auxGamesystemController').execute(req, res, next, 'deleteGamesystemUC');
  } catch (err) {
    container.getLogger().error(err.stack);
    next(new Error('Internal Error'));
  }
};
