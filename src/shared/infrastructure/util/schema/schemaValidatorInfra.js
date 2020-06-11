// schemaValidatorInfra.js

const { Validator } = require('jsonschema');
const _ = require('lodash');

const container = require('../../container/container');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[SchemaValidation Infra]';

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.validate = (instance, objectName) => {
  container.getLogger().debug(`${MODULE_NAME} validate (IN) --> instance: ${JSON.stringify(instance)}, objectName: ${objectName}`);

  const v = new Validator();

  // Getting the schmea
  const { schema } = container.get(`${_.lowerFirst(objectName)}Schema`);

  // Validating the instance with the schema
  const validationResult = v.validate(instance, schema);
  container.getLogger().debug(`${MODULE_NAME} validate (MID) --> validationResult: ${JSON.stringify(validationResult)}`);

  // Preparing Result
  const result = validationResult.errors.map((x) => `${x.property} --> ${x.message}`);

  container.getLogger().debug(`${MODULE_NAME} validate (OUT) --> result: ${JSON.stringify(result)}`);

  return result;
};
