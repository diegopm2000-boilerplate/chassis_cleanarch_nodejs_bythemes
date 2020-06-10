// Gamesystem.js

const validator = require('../../shared/domain/validator');

const nameObj = 'Gamesystem';

const checkData = (data) => {
  const schemaValidations = {
    mandatoryProperties: ['id', 'name', 'description'],
    defaultLengthProperties: ['id', 'name', 'description'],
  };

  const errors = validator.validateCompleteData(data, schemaValidations, nameObj);
  return errors;
};

class Gamesystem {
  constructor(data) {
    // Check data
    const errors = checkData(data);
    // Build workspace
    if (errors && errors.length > 0) {
      this.errors = errors;
    } else if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
    } else {
      throw new Error(`Error in constructor of ${nameObj}`);
    }
  }
}

module.exports = {
  Gamesystem,
};
