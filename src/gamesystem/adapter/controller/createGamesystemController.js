// createGamesystemController.js

const createGamesystemUC = require('../../usecase/createGamesystemUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

let requestParser;
let logger;
let gamesystemRepository;
let schemaValidator;
let uniqIdGenerator;

exports.init = (requestParserIN, gamesystemRepositoryIN, uniqIdGeneratorIN, schemaValidatorIN, loggerIN) => {
  requestParser = requestParserIN;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
  schemaValidator = schemaValidatorIN;
  uniqIdGenerator = uniqIdGeneratorIN;
};

exports.execute = async (req, res, next) => {
  try {
    const parseFields = {
      body: ['name', 'description'],
    };
    const params = requestParser.parse(req, parseFields);

    const result = await createGamesystemUC.execute(gamesystemRepository, uniqIdGenerator, schemaValidator, presenter, logger, params);

    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
