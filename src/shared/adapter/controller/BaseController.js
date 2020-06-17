// BaseController

const AppLogger = require('../../infrastructure/log/AppLogger');

class BaseController {
  constructor(args) {
    this.UCClass = args.UCClass;
    this.presenter = args.presenter;
    this.logger = args.logger;
    this.repository = args.repository;
    this.repositories = args.repositories;
    this.schemaValidator = args.schemaValidator;
    this.uniqIdGenerator = args.uniqIdGenerator;
  }

  // eslint-disable-next-line class-methods-use-this
  async execute() {
    throw Error('Not defined yet!');
  }

  buildUC() {
    return new this.UCClass({
      presenter: this.presenter,
      logger: this.logger,
      repository: this.repository,
      repositories: this.repositories,
      schemaValidator: this.schemaValidator,
      uniqIdGenerator: this.uniqIdGenerator,
    });
  }

  logInDefault() {
    AppLogger.logIn(this.logger, this.constructor.name, 'req: <<req>, res: <<res>>, next: <<next>>', 'info');
  }

  logOut(result) {
    AppLogger.logOut(this.logger, this.constructor.name, `result: ${JSON.stringify(result)}\n`, 'info');
  }

  logError(err) {
    AppLogger.logError(this.logger, this.constructor.name, `error.message: ${err.message}`);
    AppLogger.logError(this.logger, this.constructor.name, `error.stack: ${err.stack}`);
  }

  prepareResponse(result) {
    this.logOut(result);
    return result;
  }

  handleError(err) {
    this.logError(err);
    throw err;
  }
}

module.exports = BaseController;
