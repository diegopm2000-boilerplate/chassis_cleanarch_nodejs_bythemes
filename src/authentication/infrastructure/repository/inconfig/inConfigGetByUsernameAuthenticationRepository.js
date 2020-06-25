// inConfigGetByUsernameAuthenticationRepository.js

const logger = require('../../../../shared/infrastructure/log/logFacade');
const memoryConfigGetRepository = require('../../../../config/infrastructure/repository/memory/memoryGetConfigRepository');

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[inConfigGetByUsernameAuthenticationRepository]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async (username) => {
  logger.debug(`${MODULE_NAME} (IN)  -> username: ${username}`);

  // Load config
  const config = await memoryConfigGetRepository.execute();
  // Get users in config
  const { users } = config.database.inconfig;
  // Find user by username
  const userFound = users.find((x) => x.username === username);

  // Prepare User to log
  const userFoundToLog = JSON.parse(JSON.stringify(userFound));
  userFoundToLog.password = '<<obfuscated>>';

  logger.debug(`${MODULE_NAME} (OUT)  -> userFound: ${JSON.stringify(userFoundToLog)}`);
  return userFound;
};
