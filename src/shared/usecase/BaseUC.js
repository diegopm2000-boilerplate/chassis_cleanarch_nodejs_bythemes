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
    return this.presenter.presentConflict(this.logger, this.constructor.name, errors);
  }

  presentObjectNotFound() {
    return this.presenter.presentObjectNotFound(this.logger, this.constructor.name);
  }

  presentObject(obj) {
    return this.presenter.presentObject(this.logger, this.constructor.name, obj);
  }

  presentCreatedObject(obj) {
    return this.presenter.presentCreatedObject(this.logger, this.constructor.name, obj);
  }

  presentResultOfDeletion(wasDeleted) {
    return this.presenter.presentResultOfDeletion(this.logger, this.constructor.name, wasDeleted);
  }

  presentObjectIfFound(obj) {
    return this.presenter.presentObjectIfFound(this.logger, this.constructor.name, obj);
  }

  presentNotAuthenticated() {
    return this.presenter.presentNotAuthenticated(this.logger, this.constructor.name);
  }

  presentNotAuthorized() {
    return this.presenter.presentNotAuthorized(this.logger, this.constructor.name);
  }
}

module.exports = BaseUC;
