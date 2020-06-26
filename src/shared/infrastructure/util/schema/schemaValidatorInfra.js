// schemaValidatorInfra.js

const { Validator } = require('jsonschema');
const _ = require('lodash');


const logger = require('../../log/logFacade');
const moduleInfra = require('../moduleInfra');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[SchemaValidation Infra]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.validate = (instance, objectName) => {
  logger.debug(`${MODULE_NAME} validate (IN) --> instance: ${JSON.stringify(instance)}, objectName: ${objectName}`);

  const v = new Validator();

  // Getting the schema
  // const { schema } = schemas[`${_.lowerFirst(objectName)}Schema`];
  const schemas = moduleInfra.getFilesByPattern('src/**/*Schema.js');
  const schemaFileFound = schemas.find((x) => x.endsWith(`${_.lowerFirst(objectName)}Schema.js`));
  const moduleSchema = moduleInfra.loadModule(schemaFileFound);

  // Validating the instance with the schema
  const validationResult = v.validate(instance, moduleSchema);
  logger.debug(`${MODULE_NAME} validate (MID) --> validationResult: ${JSON.stringify(validationResult)}`);

  // Preparing Result
  const result = validationResult.errors.map((x) => `${x.property} --> ${x.message}`);

  logger.debug(`${MODULE_NAME} validate (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};
