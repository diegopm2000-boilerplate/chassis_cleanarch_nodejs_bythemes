// realmRepository.mock.js

const container = require('../../../../../src/shared/infrastructure/container/container');

const MODULE_NAME = '[Realm Repository Mock]';

exports.getRealmById = async (id) => {
  container.getLogger().debug(`${MODULE_NAME} getRealmById (IN) --> id: ${id}`);
  return new Promise((resolve) => {
    resolve({ id: 1, name: 'realm test' });
  });
};

exports.getAllRealms = async () => {
  container.getLogger().debug(`${MODULE_NAME} getAllRealms (IN) --> no params`);
  return new Promise((resolve) => {
    resolve([{ id: 1, name: 'realm test' }, { id: 2, name: 'realm test 2' }]);
  });
};

exports.createRealm = async (newObj) => {
  container.getLogger().debug(`${MODULE_NAME} createRealm (IN) --> newObj: ${newObj}`);
  return new Promise((resolve) => {
    resolve({ id: 3, name: 'realm test created' });
  });
};

exports.updateRealm = async (objUpdated) => {
  container.getLogger().debug(`${MODULE_NAME} updateRealm (IN) --> objUpdated: ${objUpdated}`);
  return new Promise((resolve) => {
    resolve({ id: 3, name: 'realm test updated' });
  });
};

exports.deleteRealm = async (id) => {
  container.getLogger().debug(`${MODULE_NAME} deleteRealm (IN) --> id: ${id}`);
  return new Promise((resolve) => {
    resolve(true);
  });
};
