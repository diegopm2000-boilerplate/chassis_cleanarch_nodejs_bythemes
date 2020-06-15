// getConfigController.js

const getConfigUC = require('../../usecase/getConfigUC');
const presenter = require('../../../shared/adapter/presenter/httpObjectPresenter');

// let requestParser;
let logger;
let configRepository;

exports.init = (configRepositoryIN, loggerIN) => {
  // requestParser = dependencies.requestParser;
  logger = loggerIN;
  configRepository = configRepositoryIN;
};

exports.execute = async (req, res, next) => {
  try {
    // TODO poner aquí una traza general a todos los controllers

    const result = await getConfigUC.execute(configRepository, presenter, logger);

    res.status(result.code).json(result.data);
  } catch (err) {
    logger.error(err.stack);
    next(new Error('Internal Error'));
  }
};
