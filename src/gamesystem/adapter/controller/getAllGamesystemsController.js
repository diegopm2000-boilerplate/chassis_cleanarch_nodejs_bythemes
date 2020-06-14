// getAllGamesystemsController.js

const getAllGamesystemsUC = require('../../usecase/getAllGamesystemsUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// let requestParser;
let logger;
let gamesystemRepository;

exports.init = (gamesystemRepositoryIN, loggerIN) => {
  // requestParser = dependencies.requestParser;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
};

exports.execute = async (req, res, next) => {
  try {
    // const reqOptions = {};
    // const params = requestParser(reqOptions);

    const result = await getAllGamesystemsUC.execute(gamesystemRepository, presenter, logger);

    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
