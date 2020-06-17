// GenericUC.js

class BaseUC {
  constructor(args) {
    this.presenter = args.presenter;
    this.logger = args.logger;
    this.repository = args.repository;
    this.repositories = args.repositories;
    this.schemaValidator = args.schemaValidator;
    this.uniqIdGenerator = args.uniqIdGenerator;
  }

  log(className, header, message) {
    this.logger.debug(`${className} ${header} --> ${message}}`);
  }

  logIn(className, message) {
    this.log(className, '(IN)', message);
  }

  logMid(className, message) {
    this.log(className, '(MID)', message);
  }

  logOut(className, message) {
    this.log(className, '(OUT)', message);
  }
}

module.exports = BaseUC;
