// bootstrapControllers.js

const logger = require('../../log/logColorLogger');

const requestParser = require('../../httpServer/expressOpenApiRequestParser');
const uniqIdGenerator = require('../../util/uniqIdGeneratorInfra');
const schemaValidator = require('../../util/schema/schemaValidatorInfra');

const SequelizeGamesystemRepository = require('../../../../gamesystem/infrastructure/repository/sequelize/SequelizeGamesystemRepository');

const getAllGamesystemsController = require('../../../../gamesystem/adapter/controller/getAllGamesystemsController');
const getGamesystemByIdController = require('../../../../gamesystem/adapter/controller/getGamesystemByIdController');
const createGamesystemController = require('../../../../gamesystem/adapter/controller/createGamesystemController');
const updateGamesystemController = require('../../../../gamesystem/adapter/controller/updateGamesystemController');
const deleteGamesystemController = require('../../../../gamesystem/adapter/controller/deleteGamesystemController');

exports.init = () => {
  const gamesystemRepository = new SequelizeGamesystemRepository();

  getAllGamesystemsController.init(gamesystemRepository, logger);
  getGamesystemByIdController.init(requestParser, gamesystemRepository, logger);
  createGamesystemController.init(requestParser, gamesystemRepository, uniqIdGenerator, schemaValidator, logger);
  updateGamesystemController.init(requestParser, gamesystemRepository, schemaValidator, logger);
  deleteGamesystemController.init(requestParser, gamesystemRepository, logger);
};
