// RemoteConfigRepository.js

const axios = require('axios');
const YAML = require('yaml');

const ConfigRepository = require('../../adapter/repository/ConfigRepository');

const fileInfra = require('../../../shared/infrastructure/util/fileInfra');

class RemoteConfigRepository extends ConfigRepository {
  static async get(options) {
    const innerResult = await axios.get(`${options.endpoint}/${options.filename}`);
    return (fileInfra.isYamlFile(options.filename)) ? YAML.parse(innerResult.data) : innerResult.data;
  }
}

module.exports = RemoteConfigRepository;
