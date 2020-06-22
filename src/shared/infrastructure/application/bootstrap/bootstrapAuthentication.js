// bootstrapAuthentication.js

const authenticationInfra = require('../../util/jwtInfra');

exports.init = (config) => {
  authenticationInfra.init(config.authentication);
};
