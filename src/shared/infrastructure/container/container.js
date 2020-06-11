// container.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fileInfra = require('../util/fileInfra');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const PREFIX = '../../../../';
const MODULE_FOLDER = 'src';

const moduleStore = {};
let configStore = {};

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const set = ({ name, path }) => {
  moduleStore[name] = require(path);
};

const loadFromFolder = (folder) => {
  const moduleNames = fileInfra.getAllModuleNames(folder);
  moduleNames.forEach((x) => set({ name: fileInfra.getFileName(x).split('.').slice(0, -1).join('.'), path: `${PREFIX}${x}` }));
};

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.getLogger = () => exports.get('logger');

exports.getConfig = () => configStore;

exports.setConfig = (data) => { configStore = data; };

exports.get = (nameModule) => {
  const result = moduleStore[nameModule];

  // Check if module was found in container
  if (!result) {
    throw new Error(`${nameModule} not found in container`);
  }
  // Return module found
  return result;
};

exports.defaultInit = () => {
  set({ name: 'logger', path: '../log/consoleLogger' });
};

exports.init = (loggerModuleName) => {
  loadFromFolder(MODULE_FOLDER);
  // Set the app logger pointing to the module logger
  moduleStore.logger = exports.get(loggerModuleName);
};
