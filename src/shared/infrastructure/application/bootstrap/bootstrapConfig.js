// bootstrapConfig.js

const container = require('../../container/container');

const MODULE_NAME = '[boostrapConfig]';

exports.init = async () => {
  container.getLogger().debug(`${MODULE_NAME} initConfig (IN) --> no params`);

  const loadConfigUC = container.get('loadConfigUC');
  const repository = container.get('commonProxyRepository');
  const infra = container.get('commonProxyInfra');
  const presenter = container.get('objectPresenter');

  const config = await loadConfigUC.execute(repository, infra, presenter, container.getLogger());

  container.getLogger().debug(`${MODULE_NAME} initConfig (OUT) --> config: ${JSON.stringify(config)}`);
  return config;
};
