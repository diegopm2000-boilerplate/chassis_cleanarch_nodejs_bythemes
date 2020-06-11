// errorHandler.js

/* eslint-disable no-unused-vars */

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[errorHandler]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.commonErrorHandler = (err, req, res, next) => {
  container.getLogger().error(`${MODULE_NAME} (ERROR) --> error: ${err.stack}`);

  const status = (err.status) ? err.status : 500;
  const errorObj = { code: status, message: err.message };
  res.status(status).json(errorObj);
};

exports.routeNotFoundErrorHandler = (req, res, next) => {
  const errorObj = { code: 404, message: `Cannot ${req.method} ${req.path}` };
  res.status(404).json(errorObj);
};
