// regexpInfra.js

const { pathToRegexp } = require('path-to-regexp');

exports.pathToRegExpression = (path, keys) => pathToRegexp(path, keys);
