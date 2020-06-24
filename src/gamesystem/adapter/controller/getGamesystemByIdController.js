// getGamesystemByIdController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const getGamesystemByIdUC = require('../../usecase/getGamesystemByIdUC');
const getGamesystemByIdRepository = require('../../infrastructure/repository/sequelize/getGamesystemByIdRepository');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[getGamesystemByIdController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const fieldsToParse = {
      params: ['gamesystemId'],
    };
    const params = requestParser.parse(req, fieldsToParse);

    const result = await getGamesystemByIdUC.execute({
      logger, presenter, getGamesystemByIdRepository, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
