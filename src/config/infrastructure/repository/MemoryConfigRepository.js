// MemoryConfigRepository.js

/* eslint-disable class-methods-use-this */

const ConfigRepository = require('../../adapter/repository/ConfigRepository');

let config = {};

class MemoryConfigRepository extends ConfigRepository {
  async get() {
    return new Promise((resolve) => {
      resolve(config);
    });
  }

  async set(options) {
    return new Promise((resolve) => {
      config = options.data;
      resolve(true);
    });
  }
}

module.exports = MemoryConfigRepository;
