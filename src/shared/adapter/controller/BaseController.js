// BaseController

/* eslint-disable class-methods-use-this */

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

  logIn(className) {
    this.logger.info(`${className} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);
  }

  logOut(className, result) {
    this.logger.info(`${className} (OUT) --> result: ${JSON.stringify(result)}`);
  }

  logError(className, err) {
    this.logger.error(`${className} (ERROR) --> error.message: ${err.message}`);
    this.logger.error(`${className} (ERROR) --> error.stack: ${err.stack}`);
  }

  prepareResponse(className, result) {
    this.logOut(className, result);
    return result;
  }
}

module.exports = BaseController;
