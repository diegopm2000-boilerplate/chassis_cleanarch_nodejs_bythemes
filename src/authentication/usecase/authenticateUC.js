// authenticateUC.js

// //////////////////////////////////////////////////////////////////////////////
// Properties & Constants
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[authenticateUC]';

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({
  logger, presenter, getByUsernameAuthenticationRepository, passwordInfra, authenticationInfra, params,
}) => {
  logger.debug(`${MODULE_NAME} (IN)  -> params: ${JSON.stringify(params)}`);

  // IN parameters
  const { username, password } = params;

  // Check if exists the username in the repository
  const userFound = await getByUsernameAuthenticationRepository.execute(username);
  if (userFound == null) {
    logger.debug(`${MODULE_NAME} (MID) -> User: ${username} not found in repository`);
    return presenter.presentNotAuthenticated();
  }

  // Check the password
  const passwordIsCorrect = await passwordInfra.checkPassword(password, userFound.password);
  if (!passwordIsCorrect) {
    logger.debug(`${MODULE_NAME} (MID) -> Wrong password for user: ${username}`);
    return presenter.presentNotAuthenticated();
  }

  const tokenOptions = {
    username: userFound.username,
    role: userFound.role,
  };

  // Generate Security Token
  const token = authenticationInfra.generateToken(tokenOptions);

  // Build & Return result
  const result = presenter.presentObject({ token });
  logger.debug(`${MODULE_NAME} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
};
