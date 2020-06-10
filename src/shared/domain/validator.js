// validator.js

const STRING_MAX_LENGTH = 45;

const defaultResult = {
  validation: true,
  message: '',
};

const validatePropertyMandatory = (data, propertyName, nameObj) => {
  // console.log(`--> validatePropertyMandatory, data: ${JSON.stringify(data)}, propertyName: ${propertyName}, nameObj: ${nameObj}`);
  if (data && data[`${propertyName}`] != null) {
    return defaultResult;
  }
  return {
    validation: false,
    message: `${propertyName} is mandatory in a ${nameObj}`,
  };
};

const validateMaxLength = (data, propertyName, nameObj, maxLength) => {
  // console.log(`--> validateMaxLength, data: ${JSON.stringify(data)}, propertyName: ${propertyName}, nameObj: ${nameObj}`);
  if (data && data[`${propertyName}`] && data[`${propertyName}`].length <= maxLength) {
    return defaultResult;
  }
  return {
    validation: false,
    message: `${propertyName} length can not be longer than ${maxLength} characters in a ${nameObj}`,
  };
};

const validateData = (data, nameObj) => {
  if (data) {
    return defaultResult;
  }
  return {
    validation: false,
    message: `data is mandatory in a ${nameObj}`,
  };
};

const validateArrayPropertiesMandatory = (data, arrayProp, nameObj) => arrayProp.map((x) => validatePropertyMandatory(data, x, nameObj));

const validateArrayPropertiesDefaultLength = (data, arrayProp, nameObj) => arrayProp.map((x) => validateMaxLength(data, x, nameObj, STRING_MAX_LENGTH));

const validateArrayPropertiesSpecificLength = (data, arraySpecProp, nameObj) => arraySpecProp.map((x) => validateMaxLength(data, x.property, nameObj, x.maxLength));

exports.validateCompleteData = (data, schemaValidations, nameObj) => {
  const dataResult = validateData(data, nameObj);
  let innerArrayResult = [];
  if (dataResult && dataResult.validation && schemaValidations) {
    if (schemaValidations.mandatoryProperties && schemaValidations.mandatoryProperties.length > 0) {
      innerArrayResult = validateArrayPropertiesMandatory(data, schemaValidations.mandatoryProperties, nameObj);
    }
    if (schemaValidations.defaultLengthProperties && schemaValidations.defaultLengthProperties.length > 0) {
      innerArrayResult = innerArrayResult.concat(validateArrayPropertiesDefaultLength(data, schemaValidations.defaultLengthProperties, nameObj));
    }
    if (schemaValidations.specificLengthProperties && schemaValidations.specificLengthProperties.length > 0) {
      innerArrayResult = innerArrayResult.concat(validateArrayPropertiesSpecificLength(data, schemaValidations.specificLengthProperties, nameObj));
    }
  }

  // Filter only the errors of validation
  const errorsFiltered = innerArrayResult.filter((x) => !x.validation);

  let result;
  if (errorsFiltered && errorsFiltered.length > 0) {
    result = errorsFiltered.map((x) => x.message);
  }
  return result;
};
