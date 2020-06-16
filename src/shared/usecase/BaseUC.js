// GenericUC.js

class BaseUC {
  constructor(args) {
    this.presenter = args.presenter;
    this.logger = args.logger;
    this.repository = args.repository;
    this.schemaValidator = args.schemaValidator;
    this.uniqIdGenerator = args.uniqIdGenerator;
  }

  logIn(className, params) {
    this.logger.debug(`${className} (IN) --> params: ${JSON.stringify(params)}`);
  }
}

module.exports = BaseUC;
