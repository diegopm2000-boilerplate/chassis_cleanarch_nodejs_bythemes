// GenericUC.js

const AppLogger = require('../infrastructure/log/AppLogger');

class BaseUC {
  constructor(args) {
    this.logger = args.logger;
    this.presenter = args.presenter;
    this.repository = args.repository;
    this.repositories = args.repositories;
    this.schemaValidator = args.schemaValidator;
    this.uniqIdGenerator = args.uniqIdGenerator;
  }

  logIn(message) {
    AppLogger.logIn(this.logger, this.constructor.name, message);
  }

  logMid(message) {
    AppLogger.logMid(this.logger, this.constructor.name, message);
  }

  logOut(message) {
    AppLogger.logOut(this.logger, this.constructor.name, message);
  }

  logError(message) {
    AppLogger.logError(this.logger, this.constructor.name, message);
  }

  presentConflict(errors) {
    return this.presenter.presentConflict(this.constructor.name, this.logger, errors);
  }

  presentObjectNotFound() {
    return this.presenter.presentObjectNotFound(this.constructor.name, this.logger);
  }

  presentObject(obj) {
    return this.presenter.presentObject(this.constructor.name, this.logger, obj);
  }

  presentCreatedObject(obj) {
    return this.presenter.presentCreatedObject(this.constructor.name, this.logger, obj);
  }

  presentResultOfDeletion(wasDeleted) {
    return this.presenter.presentResultOfDeletion(this.constructor.name, this.logger, wasDeleted);
  }

  presentObjectIfFound(obj) {
    return this.presenter.presentObjectIfFound(this.constructor.name, this.logger, obj);
  }
}

module.exports = BaseUC;
