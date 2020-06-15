// getGamesystemByIdController.js

const getGamesystemByIdUC = require('../../usecase/getGamesystemByIdUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getGamesystemById Controller]';

let requestParser;
let logger;
let gamesystemRepository;

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.init = (requestParserIN, gamesystemRepositoryIN, loggerIN) => {
  requestParser = requestParserIN;
  logger = loggerIN;
  gamesystemRepository = gamesystemRepositoryIN;
};

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);

    const parseFields = {
      params: ['gamesystemId'],
    };
    const params = requestParser.parse(req, parseFields);

    const result = await getGamesystemByIdUC.execute(gamesystemRepository, presenter, logger, params);

    logger.info(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
