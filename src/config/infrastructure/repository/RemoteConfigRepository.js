// RemoteConfigRepository.js

/* eslint-disable class-methods-use-this */

const axios = require('axios');
const YAML = require('yaml');

const ConfigRepository = require('../../adapter/repository/ConfigRepository');

class RemoteConfigRepository extends ConfigRepository {
  async get(options) {
    const innerResult = await axios.get(`${options.endpoint}/${options.filename}`);
    if (options.filename.endsWith('yml') || options.filename.endsWith('yaml')) {
      return YAML.parse(innerResult.data);
    }
    return innerResult.data;
  }
}

module.exports = RemoteConfigRepository;
