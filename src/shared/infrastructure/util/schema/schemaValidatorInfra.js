// schemaValidatorInfra.js

/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const { Validator } = require('jsonschema');
const _ = require('lodash');
const glob = require('glob');

const logger = require('../../log/logFacade');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[SchemaValidation Infra]';

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

// TODO estos dos metodos se pueden sacar a una libreria de utilidad

const getSchemas = () => {
  logger.debug(`${MODULE_NAME} getSchemas (IN) --> no params`);

  const result = glob.sync('src/**/*Schema.js');

  logger.debug(`${MODULE_NAME} getSchemas (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const loadModule = (pathfile) => {
  logger.debug(`${MODULE_NAME} loadModule (IN) --> pathfile: ${pathfile}`);

  const realPath = `../../../../../${pathfile}`;
  const module = require(realPath);
  logger.debug(`${MODULE_NAME} loadModule (MID) --> module loaded`);

  logger.debug(`${MODULE_NAME} loadModule (OUT) --> module: <<module>>`);
  return module;
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.validate = (instance, objectName) => {
  logger.debug(`${MODULE_NAME} validate (IN) --> instance: ${JSON.stringify(instance)}, objectName: ${objectName}`);

  const v = new Validator();

  // Getting the schema
  // const { schema } = schemas[`${_.lowerFirst(objectName)}Schema`];
  const schemas = getSchemas();
  const schemaFound = schemas.find((x) => x.endsWith(`${_.lowerFirst(objectName)}Schema.js`));
  const moduleSchema = loadModule(schemaFound);

  // Validating the instance with the schema
  const validationResult = v.validate(instance, moduleSchema);
  logger.debug(`${MODULE_NAME} validate (MID) --> validationResult: ${JSON.stringify(validationResult)}`);

  // Preparing Result
  const result = validationResult.errors.map((x) => `${x.property} --> ${x.message}`);

  logger.debug(`${MODULE_NAME} validate (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};
