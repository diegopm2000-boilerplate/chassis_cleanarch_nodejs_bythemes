// commonHttpProxyController.js

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO esto ya sobraría

exports.execute = async (req, res, next, options) => container.get('expressOpenApiController').execute(req, res, next, options);
