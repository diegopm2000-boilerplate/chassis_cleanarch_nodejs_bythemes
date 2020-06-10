// commonProxyInfra

const container = require('../container/container');

exports.get = (name) => container.get(name);
