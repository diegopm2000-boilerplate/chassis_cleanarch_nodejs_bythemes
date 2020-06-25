// createGamesystemController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const createGamesystemUC = require('../../usecase/createGamesystemUC');
const uniqIdGenerator = require('../../../shared/infrastructure/util/uniqIdGeneratorInfra');
const schemaValidator = require('../../../shared/infrastructure/util/schema/schemaValidatorInfra');
const getGamesystemByFilterRepository = require('../../infrastructure/repository/sequelize/getGamesystemByFilterRepository');
const createGamesystemRepository = require('../../infrastructure/repository/sequelize/createGamesystemRepository');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createGamesystemController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const fieldsToParse = {
      body: ['name', 'description'],
    };
    const params = requestParser.parse(req, fieldsToParse);

    const result = await createGamesystemUC.execute({
      logger, presenter, uniqIdGenerator, schemaValidator, getGamesystemByFilterRepository, createGamesystemRepository, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
