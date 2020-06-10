// jwtInfra.js

const jwt = require('jwt-simple');
const moment = require('moment');

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[JWT Infra]';

let tokenSecret;
let tokenExpiration;

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

exports.init = (options) => {
  tokenSecret = options.tokenSecret; // eslint-disable-line prefer-destructuring
  tokenExpiration = options.tokenExpiration; // eslint-disable-line prefer-destructuring
};

// Revolves the token.
// Returns true if token is resolved correctly of false in another case
exports.resolveToken = (token) => {
  try {
    // NOTE: If token is expired, launch exception and go to catch block
    jwt.decode(token, tokenSecret);

    return true;
  } catch (err) {
    container.getLogger().error(`${MODULE_NAME} resolveToken (ERROR) --> error: ${err.message}`);
    return false;
  }
};

exports.generateToken = (userInfo) => {
  container.getLogger().debug(`${MODULE_NAME} generateToken (IN) --> userInfo: ${JSON.stringify(userInfo)}, 
  tokenExpiration: ${tokenExpiration}, tokenSecret: ${tokenSecret}`);

  const payload = {
    sub: userInfo,
    iat: moment().unix(),
    exp: moment().add(tokenExpiration, 'minutes').unix(),
  };
  // NOTE: By default encoding uses HS256 to encoding
  const tokenResult = jwt.encode(payload, tokenSecret);

  container.getLogger().debug(`${MODULE_NAME} generateToken (OUT) --> tokenResult: <<tokenResult>>`);
  return tokenResult;
};

// Refreshes the token by an amount of time equals as token_expiration
exports.refreshToken = (token) => {
  container.getLogger().debug(`${MODULE_NAME} refreshToken (IN) --> token: <<obfuscated>>`);

  const payload = jwt.decode(token, tokenSecret);
  payload.iat = moment().unix();
  payload.exp = moment().add(tokenExpiration, 'minutes').unix();

  const tokenResult = jwt.encode(payload, tokenSecret);

  container.getLogger().debug(`${MODULE_NAME} refreshToken (OUT) --> Token refreshed OK`);
  return tokenResult;
};

exports.getUserInfoFromToken = (token) => {
  try {
    container.getLogger().debug(`${MODULE_NAME} getUserInfoFromToken (IN) --> token: ${token}`);

    const payload = jwt.decode(token, tokenSecret);
    const userInfo = payload.sub;
    container.getLogger().debug(`${MODULE_NAME} getUserInfoFromToken (OUT) --> userInfo: ${JSON.stringify(userInfo)}`);
    return userInfo;
  } catch (error) {
    container.getLogger().debug(`${MODULE_NAME} getUserInfoFromToken (ERROR) --> error: ${error.stack}`);
    return null;
  }
};

exports.cleanToken = (tokenwithbearer) => {
  try {
    // console.log(`--> tokenwithbearer: ${tokenwithbearer}`);
    // eslint-disable-next-line prefer-destructuring
    return tokenwithbearer.split(' ')[1];
  } catch (error) {
    container.getLogger().error(`${MODULE_NAME} (MID) --> tokenwithbearer format not valid`);
    return null;
  }
};
