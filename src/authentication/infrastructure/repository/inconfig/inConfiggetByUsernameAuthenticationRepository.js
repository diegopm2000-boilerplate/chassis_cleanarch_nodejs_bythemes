// getByUsernameAuthenticationRepository.js

const memoryConfigGetRepository = require('../../../../config/infrastructure/repository/memory/memoryConfigGetRepository');

exports.execute = async (username) => {
  const config = await memoryConfigGetRepository.execute();
  const { users } = config.database.inconfig;
  const userFound = users.find((x) => x.username === username);
  return userFound;
};
