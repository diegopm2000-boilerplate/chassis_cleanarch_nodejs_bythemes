// updateVideogameController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const updateVideogameUC = require('../../usecase/updateVideogameUC');
const schemaValidator = require('../../../shared/infrastructure/util/schema/schemaValidatorInfra');
const getVideogameByIdRepository = require('../../infrastructure/repository/sequelize/getVideogameByIdRepository');
const getVideogameByFilterRepository = require('../../infrastructure/repository/sequelize/getVideogameByFilterRepository');
const getGamesystemByIdRepository = require('../../../gamesystem/infrastructure/repository/sequelize/getGamesystemByIdRepository');
const updateVideogameRepository = require('../../infrastructure/repository/sequelize/updateVideogameRepository');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[updateVideogameController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const fieldsToParse = {
      params: ['videogameId'],
      body: ['name', 'developer', 'year', 'genre', 'gamesystemId'],
    };
    const params = requestParser.parse(req, fieldsToParse);

    const result = await updateVideogameUC.execute({
      logger, presenter, schemaValidator, getVideogameByIdRepository, getVideogameByFilterRepository, getGamesystemByIdRepository, updateVideogameRepository, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
