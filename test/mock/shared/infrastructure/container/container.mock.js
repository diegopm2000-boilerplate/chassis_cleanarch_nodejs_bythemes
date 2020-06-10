// container.mock.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

// Module store
const moduleStore = {};

const loggerMock = require('../log/logger.mock');

exports.getLogger = () => loggerMock;

const set = ({ name, pathfile }) => {
  moduleStore[name] = require(pathfile);
};

exports.get = (nameModule) => moduleStore[nameModule];


const arrayObj = [
  // Logger
  { name: 'logger', pathfile: '../log/logger.mock' },
  // Infrastructure Controllers (OpenApi Express Controllers)
  { name: 'healthcheckController', pathfile: '../../../healthcheck/infrastructure/controller/healthcheckController.mock' },
  { name: 'getConfigController', pathfile: '../../../config/infrastructure/controller/getConfigController.mock' },
  { name: 'realmController', pathfile: '../../../realm/infrastructure/controller/realmController.mock' },
  { name: 'userController', pathfile: '../../../user/infrastructure/controller/userController.mock' },
  // Infrastructure Repositories
  { name: 'fileConfigRepository', pathfile: '../../../config/infrastructure/repository/configRepository.mock' },
  { name: 'remoteConfigRepository', pathfile: '../../../config/infrastructure/repository/configRepository.mock' },
  { name: 'containerConfigRepository', pathfile: '../../../config/infrastructure/repository/configRepository.mock' },
  // Adapter Interface Components -- Presenters
  { name: 'configJSONPresenter', pathfile: '../../../config/adapter/presenter/presenter.mock' },
  // Use Cases
  { name: 'getConfigUC', pathfile: '../../../config/usecase/getConfigUC.mock' },
  { name: 'loadConfigUC', pathfile: '../../../config/usecase/loadConfigUC.mock' },
  { name: 'realmUC', pathfile: '../../../realm/usecase/realmUC.mock' },
  { name: 'healthcheckUC', pathfile: '../../../healthcheck/usecase/healthcheckUC.mock' },
  // Infrastructure Persistence
  { name: 'sequelizeInfra', pathfile: '../../../../mock/shared/infrastructure/persistence/sequelizeInfra.mock' },
];

exports.defaultInit = () => {
  set({ name: 'logger', pathfile: '../log/logger.mock' });
};

exports.init = () => {
  arrayObj.forEach((x) => set(x));
};

exports.init();

exports.getSequelizeInfra = () => exports.get('sequelizeInfra');
