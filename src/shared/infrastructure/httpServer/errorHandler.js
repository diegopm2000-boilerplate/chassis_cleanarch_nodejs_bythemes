// httpErrorHandler.js

/* eslint-disable no-unused-vars */

const logger = require('../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[error Handler]';

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const buildCommonMessage = (err) => ((err.status === 400) ? 'Bad Request' : err.message);

const buildCommonStatus = (err) => (err.status || 500);

const buildRouteNotFoundMessage = (req) => `Cannot ${req.method} ${req.path}`;

const buildRouteNotFoundStatus = () => 404;

const sendResponse = (res, status, message) => {
  res.status(status).json({ code: status, message });
};

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.commonErrorHandler = (err, req, res, next) => {
  logger.error(`${MODULE_NAME} commonErrorHandler (ERROR) --> error: ${err.stack}`);

  const message = buildCommonMessage(err);
  const status = buildCommonStatus(err);

  sendResponse(res, status, message);
};

exports.routeNotFoundErrorHandler = (req, res, next) => {
  logger.error(`${MODULE_NAME} routeNotFoundErrorHandler (ERROR) --> route not found: method: ${req.method}, path: ${req.path}`);

  const message = buildRouteNotFoundMessage(req);
  const status = buildRouteNotFoundStatus();

  sendResponse(res, status, message);
};
