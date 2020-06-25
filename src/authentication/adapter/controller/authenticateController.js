// authenticationController.js

const logger = require('../../../shared/infrastructure/log/logFacade');
const presenter = require('../../../shared/adapter/presenter/httpPresenter');
const authenticateUC = require('../../usecase/authenticateUC');
const requestParser = require('../../../shared/infrastructure/httpServer/expressOpenApiRequestParser');
const passwordInfra = require('../../../shared/infrastructure/util/passwordInfra');
const authenticationInfra = require('../../../shared/infrastructure/util/jwtInfra');
const getByUsernameAuthenticationRepository = require('../../infrastructure/repository/inconfig/inConfigGetByUsernameAuthenticationRepository');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticationController]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (req, res, next) => {
  try {
    logger.info(`${MODULE_NAME} (IN) -> no params`);

    const parseFields = {
      headers: ['username', 'password'],
    };
    const params = requestParser.parse(req, parseFields);

    const result = await authenticateUC.execute({
      logger, presenter, getByUsernameAuthenticationRepository, passwordInfra, authenticationInfra, params,
    });

    logger.info(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
    res.status(result.status).json(result.data);
  } catch (error) {
    logger.error(`${MODULE_NAME} (ERROR) -> error.stack: ${error.stack}`);
    next(new Error('Internal Error'));
  }
};
