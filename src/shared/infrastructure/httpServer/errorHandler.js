// httpErrorHandler.js

/* eslint-disable no-unused-vars */

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[error Handler]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.commonErrorHandler = (err, req, res, next) => {
  container.getLogger().error(`${MODULE_NAME} commonErrorHandler (ERROR) --> error: ${err.stack}`);

  const message = (err.status === 400) ? 'Bad Request' : err.message;

  const status = (err.status) ? err.status : 500;
  const errorObj = { code: status, message };
  res.status(status).json(errorObj);
};

exports.routeNotFoundErrorHandler = (req, res, next) => {
  container.getLogger().error(`${MODULE_NAME} routeNotFoundErrorHandler (ERROR) --> route not found: method: ${req.method}, path: ${req.path}`);

  const errorObj = { code: 404, message: `Cannot ${req.method} ${req.path}` };
  res.status(404).json(errorObj);
};
