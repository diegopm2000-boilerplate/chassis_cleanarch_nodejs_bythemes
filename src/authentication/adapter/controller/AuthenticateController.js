// AuthenticationController.js

const HttpController = require('../../../shared/adapter/controller/HttpController');
const passwordInfra = require('../../../shared/infrastructure/util/passwordInfra');
const authenticationInfra = require('../../../shared/infrastructure/util/jwtInfra');

class AuthenticateController extends HttpController {
  constructor(args) {
    super(args);
    this.passwordInfra = args.passwordInfra;
    this.authenticationInfra = args.authenticationInfra;
  }

  async execute(req, res, next) {
    try {
      super.logInDefault();

      const parseFields = {
        headers: ['username', 'password'],
      };
      const params = this.requestParser.parse(req, parseFields);

      const uc = super.buildUC();
      const result = await uc.execute(params, passwordInfra, authenticationInfra);

      super.sendResponse(result, res);
    } catch (err) {
      super.handleError(next, err);
    }
  }
}

module.exports = AuthenticateController;
