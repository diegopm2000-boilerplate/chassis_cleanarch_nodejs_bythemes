// UsersInConfigRepository.js

/* eslint-disable class-methods-use-this */

const AuthenticateRepository = require('../../../adapter/repository/AuthenticateRepository');
const MemoryConfigRepository = require('../../../../config/infrastructure/repository/MemoryConfigRepository');

class InConfigAuthenticationRepository extends AuthenticateRepository {
  async getByUsername(username) {
    const myMemoryRepository = new MemoryConfigRepository();
    const config = await myMemoryRepository.get();
    const { users } = config.database.inconfig;

    const userFound = users.find((x) => x.username === username);

    return userFound;
  }
}

module.exports = InConfigAuthenticationRepository;
