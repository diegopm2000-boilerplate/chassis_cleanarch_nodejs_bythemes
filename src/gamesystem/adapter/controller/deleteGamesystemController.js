// deleteGamesystemController.js

const deleteGamesystemUC = require('../../usecase/deleteGamesystemUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

let requestParser;
let logger;
let gamesystemRepository;

exports.init = (requestParserIN, gamesystemRepositoryIN, loggerIN) => {
  requestParser = requestParserIN;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
};

exports.execute = async (req, res, next) => {
  try {
    const parseFields = {
      params: ['gamesystemId'],
    };
    const params = requestParser.parse(req, parseFields);

    const result = await deleteGamesystemUC.execute(gamesystemRepository, presenter, logger, params);

    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
