// bootstrapControllers.js

const logger = require('../../log/logFacade');

// infrastructure
const requestParser = require('../../httpServer/expressOpenApiRequestParser');
const uniqIdGenerator = require('../../util/uniqIdGeneratorInfra');
const schemaValidator = require('../../util/schema/schemaValidatorInfra');

// repositories
const MemoryConfigRepository = require('../../../../config/infrastructure/repository/MemoryConfigRepository');
const InConfigAuthenticationRepository = require('../../../../authentication/infrastructure/repository/inconfig/InConfigAuthenticationRepository');
const SequelizeGamesystemRepository = require('../../../../gamesystem/infrastructure/repository/sequelize/SequelizeGamesystemRepository');
const SequelizeCRUDRepository = require('../../repository/SequelizeCRUDRepository');
const sequelizeInfra = require('../../database/sequelize/sequelizeInfra');

// use cases
const HealthcheckUC = require('../../../../healthcheck/usecase/HealthcheckUC');
const GetConfigUC = require('../../../../config/usecase/GetConfigUC');
const AuthenticateUC = require('../../../../authentication/usecase/AuthenticateUC');
const GetAllgamesystemsUC = require('../../../../gamesystem/usecase/GetAllGamesystemsUC');
const GetGamesystemByIdUC = require('../../../../gamesystem/usecase/GetGamesystemByIdUC');
const CreateGamesystemUC = require('../../../../gamesystem/usecase/CreateGamesystemUC');
const UpdateGamesystemUC = require('../../../../gamesystem/usecase/UpdateGamesystemUC');
const DeleteGamesystemUC = require('../../../../gamesystem/usecase/DeleteGamesystemUC');

// presenters
const HttpPresenter = require('../../../adapter/presenter/HttpPresenter');

// controllers
const HealthcheckController = require('../../../../healthcheck/adapter/controller/HealthcheckController');
const GetConfigController = require('../../../../config/adapter/controller/GetConfigController');
const AuthenticateController = require('../../../../authentication/adapter/controller/AuthenticateController');
const GetAllGamesystemsController = require('../../../../gamesystem/adapter/controller/GetAllGamesystemsController');
const GetGamesystemByIdController = require('../../../../gamesystem/adapter/controller/GetGamesystemByIdController');
const CreateGamesystemController = require('../../../../gamesystem/adapter/controller/CreateGamesystemController');
const UpdateGamesystemController = require('../../../../gamesystem/adapter/controller/UpdateGamesystemController');
const DeleteGamesystemController = require('../../../../gamesystem/adapter/controller/DeleteGamesystemController');

// TODO ver si se pudiera hacer un arranque generico y que vaya llamando a los constructores de cada controller
// Creo que es lo mejor para evitar que crezca esto de forma exagerada.

exports.init = () => {
  const memoryConfigRepository = new MemoryConfigRepository();
  const inConfigAuthenticationRepository = new InConfigAuthenticationRepository();
  const sequelizeCRUDRepository = new SequelizeCRUDRepository();
  const gamesystemRepository = new SequelizeGamesystemRepository({
    logger, sequelizeCRUDRepository, model: sequelizeInfra.getModel('gameSystemModel'),
  });

  const controllers = {
    healthcheckController: new HealthcheckController({
      logger, presenter: HttpPresenter, UCClass: HealthcheckUC,
    }),
    getConfigController: new GetConfigController({
      logger, presenter: HttpPresenter, UCClass: GetConfigUC, repository: memoryConfigRepository,
    }),
    authenticateController: new AuthenticateController({
      logger, presenter: HttpPresenter, UCClass: AuthenticateUC, repository: inConfigAuthenticationRepository, requestParser,
    }),
    getAllGamesystemsController: new GetAllGamesystemsController({
      logger, presenter: HttpPresenter, UCClass: GetAllgamesystemsUC, repository: gamesystemRepository,
    }),
    getGamesystemByIdController: new GetGamesystemByIdController({
      logger, presenter: HttpPresenter, UCClass: GetGamesystemByIdUC, repository: gamesystemRepository, requestParser,
    }),
    createGamesystemController: new CreateGamesystemController({
      logger, presenter: HttpPresenter, UCClass: CreateGamesystemUC, repository: gamesystemRepository, requestParser, schemaValidator, uniqIdGenerator,
    }),
    updateGamesystemController: new UpdateGamesystemController({
      logger, presenter: HttpPresenter, UCClass: UpdateGamesystemUC, repository: gamesystemRepository, requestParser, schemaValidator,
    }),
    deleteGamesystemController: new DeleteGamesystemController({
      logger, presenter: HttpPresenter, UCClass: DeleteGamesystemUC, repository: gamesystemRepository, requestParser,
    }),
  };

  return controllers;
};
