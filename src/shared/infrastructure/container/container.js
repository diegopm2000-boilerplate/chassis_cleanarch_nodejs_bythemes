// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fileInfra = require('../util/fileInfra');

// Module store
const moduleStore = {};
// Config store
let configStore = {};

const prefix = '../../../../';

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const set = ({ name, path }) => {
  // console.log(`--> loading module: ${name}, path: ${path}`);
  moduleStore[name] = require(path);
};

const loadFromFileDescriptor = (filepath) => {
  const newArrayObj = fileInfra.loadObjFromFileSync(filepath);
  newArrayObj.components.forEach((x) => set({ name: x.name, path: `${prefix}${x.path}` }));
};

const loadFromFolder = (folder) => {
  const moduleNames = fileInfra.getAllModuleNames(folder);
  // console.log(`--> moduleNames: ${JSON.stringify(moduleNames)}`);

  moduleNames.forEach((x) => set({ name: fileInfra.getFileName(x).split('.').slice(0, -1).join('.'), path: `${prefix}${x}` }));
};

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.get = (nameModule) => {
  const result = moduleStore[nameModule];

  if (!result) {
    throw new Error(`${nameModule} not found in container`);
  }

  return result;
};

exports.defaultInit = () => {
  set({ name: 'logger', path: '../log/consoleLogger' });
};

exports.init = ({ loggerModuleName, loadingMethod }) => {
  // console.log(`--> loggerModuleName: ${loggerModuleName}, loadingMethod: ${loadingMethod}`);

  if (loadingMethod === exports.LOADING_METHOD_FROM_FOLDER) {
    loadFromFolder('src');
  } else if (loadingMethod === exports.LOADING_METHOD_FROM_DESCRIPTOR_FILE) {
    loadFromFileDescriptor('./src/shared/infrastructure/container/container.yml');
  } else {
    throw new Error(`${loadingMethod} as modules loading method is not valid.`);
  }

  // Set the app logger pointing to the module logger
  moduleStore.logger = exports.get(loggerModuleName);
};

exports.getLogger = () => exports.get('logger');

exports.getConfig = () => configStore;

exports.setConfig = (data) => {
  configStore = data;
};

exports.getSequelizeInfra = () => exports.get('sequelizeInfra');

exports.LOADING_METHOD_FROM_FOLDER = 'LOADING_METHOD_FROM_FOLDER';

exports.LOADING_METHOD_FROM_DESCRIPTOR_FILE = 'LOADING_METHOD_FROM_DESCRIPTOR_FILE';
