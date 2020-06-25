// bootstrapLogging.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const logFacade = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.init = (config) => {
  const logNameModule = config.log.module;

  const module = require(`../../log/${logNameModule}`);
  logFacade.init(module, config.log);
};
