// Gamesystem.js

const { BaseDomainObj } = require('../../shared/domain/BaseDomainObj');

const NAME_DOMAIN_OBJ = 'Videogame';

class Gamesystem extends BaseDomainObj {
  constructor(data, schemaValidatorInfra) {
    super(data, schemaValidatorInfra, NAME_DOMAIN_OBJ);
  }
}

module.exports = Gamesystem;
