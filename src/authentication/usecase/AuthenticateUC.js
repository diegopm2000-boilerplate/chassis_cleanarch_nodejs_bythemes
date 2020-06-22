// AuthenticationUC.js

const BaseUC = require('../../shared/usecase/BaseUC');

class AuthenticateUC extends BaseUC {
  async execute(params, passwordInfra, authenticationInfra) {
    super.logIn(`params: ${JSON.stringify(params)}`);

    // IN parameters
    const { username, password } = params;

    // Check if exists the username in the repository
    const userFound = await this.repository.getByUsername(username);
    if (userFound == null) {
      super.logMid(`User: ${username} not found in repository`);
      return super.presentNotAuthenticated();
    }

    // Check the password
    const passwordIsCorrect = await passwordInfra.checkPassword(password, userFound.password);
    if (!passwordIsCorrect) {
      super.logMid(`Wrong password for user: ${username}`);
      return super.presentNotAuthenticated();
    }

    const tokenOptions = {
      username: userFound.username,
      role: userFound.role,
    };

    // Generate Security Token
    const token = authenticationInfra.generateToken(tokenOptions);

    // Build & Return Result
    return super.presentObject({ token });
  }
}

module.exports = AuthenticateUC;
