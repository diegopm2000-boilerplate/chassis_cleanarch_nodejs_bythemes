// fileConfigRepository.js

/* eslint-disable class-methods-use-this */

const fileInfra = require('../../../shared/infrastructure/util/fileInfra');
const constants = require('../../../shared/infrastructure/constants/constants');

const ConfigRepository = require('../../adapter/repository/ConfigRepository');

class FileConfigRepository extends ConfigRepository {
  async get(options) {
    const result = await fileInfra.loadObjFromFile(`${constants.CONFIG_BASEPATH}/${options.filename}`);
    return result;
  }
}

module.exports = FileConfigRepository;
