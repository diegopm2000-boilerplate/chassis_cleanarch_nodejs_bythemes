// createVideogameController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const createVideogameUC = require('../../usecase/createVideogameUC');
const uniqIdGenerator = require('../../../shared/infrastructure/util/uniqIdGeneratorInfra');
const schemaValidator = require('../../../shared/infrastructure/util/schema/schemaValidatorInfra');
const getVideogameByFilterRepository = require('../../infrastructure/repository/sequelize/getVideogameByFilterRepository');
const getGamesystemByIdRepository = require('../../../gamesystem/infrastructure/repository/sequelize/getGamesystemByIdRepository');
const createVideogameRepository = require('../../infrastructure/repository/sequelize/createVideogameRepository');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[createVideogameController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const fieldsToParse = {
      body: ['name', 'developer', 'year', 'genre', 'gamesystemId'],
    };
    const params = requestParser.parse(req, fieldsToParse);

    const result = await createVideogameUC.execute({
      logger, presenter, uniqIdGenerator, schemaValidator, getVideogameByFilterRepository, getGamesystemByIdRepository, createVideogameRepository, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
