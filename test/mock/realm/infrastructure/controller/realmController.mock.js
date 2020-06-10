// realmController.mock.js

/* eslint-disable no-unused-vars */

exports.getRealmById = async (req, res, next) => new Promise((resolve) => {
  resolve({ id: 1, name: 'realm test' });
});

exports.getAllRealms = async (req, res, next) => new Promise((resolve) => {
  resolve([{ id: 1, name: 'realm test' }, { id: 2, name: 'realm test 2' }]);
});

exports.createRealm = async (req, res, next) => new Promise((resolve) => {
  resolve({ id: 3, name: 'realm test created' });
});

exports.updateRealm = async (req, res, next) => new Promise((resolve) => {
  resolve({ id: 3, name: 'realm test updated' });
});

exports.deleteRealm = async (req, res, next) => new Promise((resolve) => {
  resolve(true);
});
