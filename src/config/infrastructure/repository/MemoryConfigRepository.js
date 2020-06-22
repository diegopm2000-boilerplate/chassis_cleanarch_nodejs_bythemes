// MemoryConfigRepository.js

const ConfigRepository = require('../../adapter/repository/ConfigRepository');

let config = {};

class MemoryConfigRepository extends ConfigRepository {
  static async get() {
    return new Promise((resolve) => {
      resolve(config);
    });
  }

  static async set(options) {
    return new Promise((resolve) => {
      config = options.data;
      resolve(true);
    });
  }
}

module.exports = MemoryConfigRepository;
