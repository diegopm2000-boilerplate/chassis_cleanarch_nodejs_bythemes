// healthcheckUC.mock.js

/* eslint-disable no-unused-vars */

const MODULE_NAME = '[healthcheck Mock UC]';

exports.execute = async (presenter, logger) => new Promise((resolve) => {
  console.log('Entramos por el healthcheck Mock UC');
  resolve({ code: 200, data: { message: 'OK' } });
});
