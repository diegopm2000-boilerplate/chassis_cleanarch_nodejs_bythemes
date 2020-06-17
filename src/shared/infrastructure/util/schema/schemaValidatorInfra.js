// schemaValidatorInfra.js

const { Validator } = require('jsonschema');
const _ = require('lodash');

const logger = require('../../log/logFacade');
// eslint-disable-next-line no-unused-vars
const gamesystemSchema = require('./gamesystemSchema');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[SchemaValidation Infra]';

const schemas = {
  gamesystemSchema,
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.validate = (instance, objectName) => {
  logger.debug(`${MODULE_NAME} validate (IN) --> instance: ${JSON.stringify(instance)}, objectName: ${objectName}`);

  const v = new Validator();

  // Getting the schema
  const { schema } = schemas[`${_.lowerFirst(objectName)}Schema`];

  // Validating the instance with the schema
  const validationResult = v.validate(instance, schema);
  logger.debug(`${MODULE_NAME} validate (MID) --> validationResult: ${JSON.stringify(validationResult)}`);

  // Preparing Result
  const result = validationResult.errors.map((x) => `${x.property} --> ${x.message}`);

  logger.debug(`${MODULE_NAME} validate (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};
