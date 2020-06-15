// bootstrapControllers.js

const logger = require('../../log/logColorLogger');

// const requestParser = require('../../httpServer/expressOpenApiRequestParser');
// const uniqIdGenerator = require('../../util/uniqIdGeneratorInfra');
// const schemaValidator = require('../../util/schema/schemaValidatorInfra');

// const SequelizeGamesystemRepository = require('../../../../gamesystem/infrastructure/repository/sequelize/SequelizeGamesystemRepository');

// repositories
const MemoryConfigRepository = require('../../../../config/infrastructure/repository/MemoryConfigRepository');

// const getConfigController = require('../../../../config/adapter/controller/getConfigController');

// use cases
const healthcheckUC = require('../../../../healthcheck/usecase/healthcheckUC');
const getConfigUC = require('../../../../config/usecase/getConfigUC');

const httpObjectPresenter = require('../../../adapter/presenter/httpObjectPresenter');

const HealthcheckController = require('../../../../healthcheck/adapter/controller/HealthcheckController');
const GetConfigController = require('../../../../config/adapter/controller/GetConfigController');

// const getAllGamesystemsController = require('../../../../gamesystem/adapter/controller/getAllGamesystemsController');
// const getGamesystemByIdController = require('../../../../gamesystem/adapter/controller/getGamesystemByIdController');
// const createGamesystemController = require('../../../../gamesystem/adapter/controller/createGamesystemController');
// const updateGamesystemController = require('../../../../gamesystem/adapter/controller/updateGamesystemController');
// const deleteGamesystemController = require('../../../../gamesystem/adapter/controller/deleteGamesystemController');

exports.init = () => {
  const memoryConfigRepository = new MemoryConfigRepository();
  // const gamesystemRepository = new SequelizeGamesystemRepository();

  const controllers = {
    healthcheckController: new HealthcheckController({ logger, uc: healthcheckUC, presenter: httpObjectPresenter }),
    getConfigController: new GetConfigController({
      logger, uc: getConfigUC, presenter: httpObjectPresenter, repository: memoryConfigRepository,
    }),
  };

  // getConfigController.init(memoryConfigRepository, logger);
  // healthcheckController.init(logger);

  // getAllGamesystemsController.init(gamesystemRepository, logger);
  // getGamesystemByIdController.init(requestParser, gamesystemRepository, logger);
  // createGamesystemController.init(requestParser, gamesystemRepository, uniqIdGenerator, schemaValidator, logger);
  // updateGamesystemController.init(requestParser, gamesystemRepository, schemaValidator, logger);
  // deleteGamesystemController.init(requestParser, gamesystemRepository, logger);

  return controllers;
};
