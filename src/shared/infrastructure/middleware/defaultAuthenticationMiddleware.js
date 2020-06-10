// defaultAuthenticationMiddleware.js

const container = require('../container/container');

const MODULE_NAME = '[authorizeInWorkspace Controller]';

exports.execute = async (req, res, next) => {
  try {
    const { tokenwithbearer } = req.headers;
    container.getLogger().debug(`${MODULE_NAME} (IN) --> tokenwithbearer: ${tokenwithbearer}`);

    const uc = container.get('authorizeUC');
    const presenter = container.get('httpObjectPresenter');
    const authenticationInfra = container.get('jwtInfra');
    const regexpInfra = container.get('regexpInfra');
    const logger = container.getLogger();

    const result = await uc.execute(authenticationInfra, regexpInfra, presenter, logger, tokenwithbearer);

    if (result.code === 401) {
      container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
      res.status(result.code).json(result.data);
    } else {
      next();
    }
  } catch (error) {
    container.getLogger().error(error.stack);
    next(new Error('Internal Error'));
  }
};
