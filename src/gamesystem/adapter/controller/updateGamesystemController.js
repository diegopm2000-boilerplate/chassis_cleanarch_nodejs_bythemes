// updateGamesystemController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const updateGamesystemUC = require('../../usecase/updateGamesystemUC');
const schemaValidator = require('../../../shared/infrastructure/util/schema/schemaValidatorInfra');
const getGamesystemByIdRepository = require('../../infrastructure/repository/sequelize/getGamesystemByIdRepository');
const getGamesystemByFilterRepository = require('../../infrastructure/repository/sequelize/getGamesystemByFilterRepository');
const updateGamesystemRepository = require('../../infrastructure/repository/sequelize/updateGamesystemRepository');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateGamesystemController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const fieldsToParse = {
      params: ['gamesystemId'],
      body: ['name', 'description'],
    };
    const params = requestParser.parse(req, fieldsToParse);

    const result = await updateGamesystemUC.execute({
      logger, presenter, schemaValidator, getGamesystemByIdRepository, getGamesystemByFilterRepository, updateGamesystemRepository, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
