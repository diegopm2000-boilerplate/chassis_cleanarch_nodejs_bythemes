// updateGamesystemController.js

const updateGamesystemUC = require('../../usecase/updateGamesystemUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateGamesystem Controller]';

let requestParser;
let logger;
let gamesystemRepository;
let schemaValidator;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (requestParserIN, gamesystemRepositoryIN, schemaValidatorIN, loggerIN) => {
  requestParser = requestParserIN;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
  schemaValidator = schemaValidatorIN;
};

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

    const parseFields = {
      params: ['gamesystemId'],
      body: ['name', 'description'],
    };
    const params = requestParser.parse(req, parseFields);

    const result = await updateGamesystemUC.execute(gamesystemRepository, schemaValidator, presenter, logger, params);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
