// commonHttpProxyController.js

const container = require('../container/container');

exports.execute = async (req, res, next, options) => container.get('expressOpenApiController').execute(req, res, next, options);
