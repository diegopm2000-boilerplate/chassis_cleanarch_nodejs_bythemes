// userController.mock.js

/* eslint-disable no-unused-vars */

exports.getUserById = async (req, res, next) => new Promise((resolve) => {
  resolve({ id: 1, name: 'user test' });
});

exports.getAllUsers = async (req, res, next) => new Promise((resolve) => {
  resolve([{ id: 1, name: 'user test' }, { id: 2, name: 'user test 2' }]);
});

exports.createUser = async (req, res, next) => new Promise((resolve) => {
  resolve({ id: 3, name: 'user test created' });
});

exports.updateUser = async (req, res, next) => new Promise((resolve) => {
  resolve({ id: 3, name: 'user test updated' });
});

exports.deleteUser = async (req, res, next) => new Promise((resolve) => {
  resolve(true);
});
