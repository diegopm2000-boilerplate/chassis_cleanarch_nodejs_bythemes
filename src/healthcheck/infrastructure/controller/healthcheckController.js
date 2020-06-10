// healthcheckController.js

const container = require('../../../shared/infrastructure/container/container');

const MODULE_NAME = '[HealtchCheck Controller]';

const getObjFromContainer = () => {
  const result = {
    uc: container.get('healthcheckUC'),
    presenter: container.get('httpObjectPresenter'),
    logger: container.getLogger(),
  };
  return result;
};

exports.execute = async (req, res, next) => {
  try {
    container.getLogger().debug(`${MODULE_NAME} (IN) --> no params`);

    const objs = getObjFromContainer();

    const result = await objs.uc.execute(objs.presenter, objs.logger);

    container.getLogger().debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
    res.status(result.code).json(result.data);
  } catch (error) {
    container.getLogger().error(error.stack);
    next(new Error('Internal Error'));
  }
};
