// HttpPresenter.js

const BasePresenter = require('./basePresenter');
const AppLogger = require('../../infrastructure/log/AppLogger');

const MSG_NOT_AUTHORIZED = { code: 401, data: { code: 401, message: 'User not authorized to resource' } };
const MSG_NOT_AUTHENTICATED = { code: 403, data: { code: 403, message: 'User not authenticated in the system' } };
const MGS_OBJECT_NOT_FOUND = { code: 404, data: { code: 404, message: 'Object not found in the system' } };
const MSG_RELATIONSHIP_NOT_FOUND = { code: 404, data: { code: 404, message: 'Relationship not found in the system' } };
const MSG_OBJECT_DELETED = { code: 204, data: null };

class HttpPresenter extends BasePresenter {
  static returnHandler(logger, className, result) {
    AppLogger.logOut(logger, className, JSON.stringify(result), 'info');
    return result;
  }

  static presentNotAuthorized(logger, className) {
    const result = MSG_NOT_AUTHORIZED;
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentNotAuthenticated(logger, className) {
    const result = MSG_NOT_AUTHENTICATED;
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentObjectNotFound(logger, className) {
    const result = MGS_OBJECT_NOT_FOUND;
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentObject(logger, className, object) {
    const result = { code: 200, data: object };
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentCreatedObject(logger, className, object) {
    const result = { code: 201, data: object };
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentObjectIfFound(logger, className, object) {
    const result = (object) ? { code: 200, data: object } : MGS_OBJECT_NOT_FOUND;
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentResultOfDeletion(logger, className, wasDeleted) {
    const result = (wasDeleted) ? MSG_OBJECT_DELETED : MGS_OBJECT_NOT_FOUND;
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentResultOfRelationshipDeletion(logger, className, wasDeleted) {
    const result = (wasDeleted) ? MSG_OBJECT_DELETED : MSG_RELATIONSHIP_NOT_FOUND;
    return HttpPresenter.returnHandler(logger, className, result);
  }

  static presentConflict(logger, className, errors) {
    const message = (Array.isArray(errors) && errors.length > 0) ? errors[0] : errors;
    const result = { code: 409, data: { code: 409, message } };
    return HttpPresenter.returnHandler(logger, className, result);
  }
}

module.exports = HttpPresenter;
