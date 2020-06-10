// realmUC.mock.js

/* eslint-disable no-unused-vars */

exports.getRealmById = async (repository, presenter, logger, id) => new Promise((resolve) => {
  resolve({ id: 1, name: 'realm test' });
});

exports.getAllRealms = async (repository, presenter, logger, id) => new Promise((resolve) => {
  resolve([{ id: 1, name: 'realm test' }, { id: 2, name: 'realm test 2' }]);
});

exports.createRealm = async (repository, presenter, logger, data) => new Promise((resolve) => {
  resolve({ id: 3, name: 'realm test created' });
});

exports.updateRealm = async (repository, presenter, logger, data) => new Promise((resolve) => {
  resolve({ id: 3, name: 'realm test updated' });
});

exports.deleteRealm = async (repository, presenter, logger, data) => new Promise((resolve) => {
  resolve(true);
});
