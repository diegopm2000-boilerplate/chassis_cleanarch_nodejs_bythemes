// createGamesystemController.js

const createGamesystemUC = require('../../usecase/createGamesystemUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createGameSystem Controller]';

let requestParser;
let logger;
let gamesystemRepository;
let schemaValidator;
let uniqIdGenerator;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (requestParserIN, gamesystemRepositoryIN, uniqIdGeneratorIN, schemaValidatorIN, loggerIN) => {
  requestParser = requestParserIN;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
  schemaValidator = schemaValidatorIN;
  uniqIdGenerator = uniqIdGeneratorIN;
};

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

    const parseFields = {
      body: ['name', 'description'],
    };
    const params = requestParser.parse(req, parseFields);

    const result = await createGamesystemUC.execute(gamesystemRepository, uniqIdGenerator, schemaValidator, presenter, logger, params);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
