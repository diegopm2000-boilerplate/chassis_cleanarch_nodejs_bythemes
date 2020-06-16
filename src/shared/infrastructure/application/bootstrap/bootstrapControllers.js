// bootstrapControllers.js

const logger = require('../../log/logColorLogger');

// infrastructure
const requestParser = require('../../httpServer/expressOpenApiRequestParser');
const uniqIdGenerator = require('../../util/uniqIdGeneratorInfra');
const schemaValidator = require('../../util/schema/schemaValidatorInfra');

// repositories
const MemoryConfigRepository = require('../../../../config/infrastructure/repository/MemoryConfigRepository');
const SequelizeGamesystemRepository = require('../../../../gamesystem/infrastructure/repository/sequelize/SequelizeGamesystemRepository');

// use cases
const healthcheckUC = require('../../../../healthcheck/usecase/healthcheckUC');
const getConfigUC = require('../../../../config/usecase/getConfigUC');
const getAllgamesystemsUC = require('../../../../gamesystem/usecase/getAllGamesystemsUC');
const getGamesystemByIdUC = require('../../../../gamesystem/usecase/getGamesystemByIdUC');
const createGamesystemUC = require('../../../../gamesystem/usecase/createGamesystemUC');
const updateGamesystemUC = require('../../../../gamesystem/usecase/updateGamesystemUC');
const deleteGamesystemUC = require('../../../../gamesystem/usecase/deleteGamesystemUC');

// presenters
const httpObjectPresenter = require('../../../adapter/presenter/httpObjectPresenter');

// controllers
const HealthcheckController = require('../../../../healthcheck/adapter/controller/HealthcheckController');
const GetConfigController = require('../../../../config/adapter/controller/GetConfigController');

const GetAllGamesystemsController = require('../../../../gamesystem/adapter/controller/GetAllGamesystemsController');
const GetGamesystemByIdController = require('../../../../gamesystem/adapter/controller/GetGamesystemByIdController');
const CreateGamesystemController = require('../../../../gamesystem/adapter/controller/CreateGamesystemController');
const UpdateGamesystemController = require('../../../../gamesystem/adapter/controller/UpdateGamesystemController');
const DeleteGamesystemController = require('../../../../gamesystem/adapter/controller/DeleteGamesystemController');

exports.init = () => {
  const memoryConfigRepository = new MemoryConfigRepository();
  const gamesystemRepository = new SequelizeGamesystemRepository();

  const controllers = {
    healthcheckController: new HealthcheckController(
      { logger, presenter: httpObjectPresenter, uc: healthcheckUC },
    ),
    getConfigController: new GetConfigController({
      logger, presenter: httpObjectPresenter, uc: getConfigUC, repository: memoryConfigRepository,
    }),
    getAllGamesystemsController: new GetAllGamesystemsController({
      logger, presenter: httpObjectPresenter, uc: getAllgamesystemsUC, repository: gamesystemRepository,
    }),
    getGamesystemByIdController: new GetGamesystemByIdController({
      logger, presenter: httpObjectPresenter, uc: getGamesystemByIdUC, repository: gamesystemRepository, requestParser,
    }),
    createGamesystemController: new CreateGamesystemController({
      logger, presenter: httpObjectPresenter, uc: createGamesystemUC, repository: gamesystemRepository, requestParser, schemaValidator, uniqIdGenerator,
    }),
    updateGamesystemController: new UpdateGamesystemController({
      logger, presenter: httpObjectPresenter, uc: updateGamesystemUC, repository: gamesystemRepository, requestParser, schemaValidator,
    }),
    deleteGamesystemController: new DeleteGamesystemController({
      logger, presenter: httpObjectPresenter, uc: deleteGamesystemUC, repository: gamesystemRepository, requestParser,
    }),
  };

  return controllers;
};
