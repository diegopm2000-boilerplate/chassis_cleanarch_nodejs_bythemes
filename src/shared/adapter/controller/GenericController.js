// GenericController.js

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

class GenericController {
  constructor(args) {
    this.presenter = args.presenter;
    this.UCClass = args.UCClass;
    this.logger = args.logger;
    this.repository = args.repository;
    this.requestParser = args.requestParser;
    this.schemaValidator = args.schemaValidator;
    this.uniqIdGenerator = args.uniqIdGenerator;
  }

  async execute(req, res, next) {
    throw Error('Not defined yet!');
  }

  buildUC() {
    return new this.UCClass({
      presenter: this.presenter, logger: this.logger, repository: this.repository, schemaValidator: this.schemaValidator, uniqIdGenerator: this.uniqIdGenerator,
    });
  }

  logIn(className) {
    this.logger.info(`${className} (IN) --> req: <<req>, res: <<res>>, next: <<next>>`);
  }

  logOut(className, result) {
    this.logger.info(`${className} (OUT) --> result: ${JSON.stringify(result)}`);
  }

  returnResponse(className, result, res) {
    this.logOut(className, result);
    res.status(result.code).json(result.data);
  }
}

module.exports = GenericController;
