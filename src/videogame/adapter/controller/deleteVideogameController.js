// deleteVideogameController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const deleteVideogameUC = require('../../usecase/deleteVideogameUC');
const getVideogameByIdRepository = require('../../infrastructure/repository/sequelize/getVideogameByIdRepository');
const deleteVideogameRepository = require('../../infrastructure/repository/sequelize/deleteVideogameRepository');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[deleteVideogameController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const fieldsToParse = {
      params: ['videogameId'],
    };
    const params = requestParser.parse(req, fieldsToParse);

    const result = await deleteVideogameUC.execute({
      logger, presenter, getVideogameByIdRepository, deleteVideogameRepository, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
