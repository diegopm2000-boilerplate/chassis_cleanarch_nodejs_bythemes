// httpObjectPresenter.js

const OBJ_PRESENT = 'objPresent';
const OBJ_LIST_PRESENT = 'objListPresent';
const OBJ_CREATED_PRESENT = 'objCreatedPresent';
const OBJ_DELETED_PRESENT = 'objDeletedPresent';
const OBJ_NOT_FOUND_PRESENT = 'objNotFoundPresent';
const OBJ_MOD_CONFLICT_PRESENT = 'objModConflictPresent';
const OBJ_RELATIONSHIP_NOT_FOUND_PRESENT = 'relationshipNotFoundPresent';
const OBJ_NOT_AUTHENTICATED_PRESENT = 'notAuthenticatedPresent';
const OBJ_NOT_AUTHORIZED_PRESENT = 'notAuthorizedPresent';

// Reestructurar esto

const present = (options) => {
  let result;

  switch (options.case) {
    case OBJ_PRESENT:
      result = { code: 200, data: options.obj };
      break;
    case OBJ_LIST_PRESENT:
      result = { code: 200, data: options.obj };
      break;
    case OBJ_CREATED_PRESENT:
      result = { code: 201, data: options.obj };
      break;
    case OBJ_DELETED_PRESENT:
      result = { code: 204, data: null };
      break;
    case OBJ_NOT_FOUND_PRESENT:
      result = { code: 404, data: { code: 404, message: 'Object not found in the system' } };
      break;
    case OBJ_MOD_CONFLICT_PRESENT:
      result = { code: 409, data: { code: 409, message: options.message } };
      break;
    case OBJ_RELATIONSHIP_NOT_FOUND_PRESENT:
      result = { code: 404, data: { code: 404, message: 'Relationship not found in the system' } };
      break;
    case OBJ_NOT_AUTHENTICATED_PRESENT:
      result = { code: 403, data: { code: 403, message: 'User not authenticated in the system' } };
      break;
    case OBJ_NOT_AUTHORIZED_PRESENT:
      result = { code: 401, data: { code: 401, message: 'User not authorized to resource' } };
      break;
    default:
      throw new Error(`${options.case} as presentationCase not defined in presenter!`);
  }

  options.logger.debug(`${options.moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

exports.presentObjectIfFound = (moduleName, logger, objectFound) => {
  if (objectFound) {
    return present({
      moduleName, logger, case: OBJ_PRESENT, obj: objectFound,
    });
  }

  return present({ moduleName, logger, case: OBJ_NOT_FOUND_PRESENT });
};

exports.presentObjectNotFound = (moduleName, logger) => present({ moduleName, logger, case: OBJ_NOT_FOUND_PRESENT });

exports.presentObject = (moduleName, logger, object) => present({
  moduleName, logger, case: OBJ_PRESENT, obj: object,
});

exports.presentCreatedObject = (moduleName, logger, object) => present({
  moduleName, logger, case: OBJ_CREATED_PRESENT, obj: object,
});

exports.presentConflict = (moduleName, logger, errors) => {
  let message;
  if (Array.isArray(errors)) {
    // eslint-disable-next-line prefer-destructuring
    message = errors[0];
  } else {
    message = errors;
  }

  return present({
    moduleName, logger, case: OBJ_MOD_CONFLICT_PRESENT, message,
  });
};

exports.presentResultOfDeletion = (moduleName, logger, wasDeleted) => {
  if (wasDeleted) {
    return present({ moduleName, logger, case: OBJ_DELETED_PRESENT });
  }

  return present({ moduleName, logger, case: OBJ_NOT_FOUND_PRESENT });
};

exports.presentResultOfRelationshipDeletion = (moduleName, logger, wasDeleted) => {
  if (wasDeleted) {
    return present({ moduleName, logger, case: OBJ_DELETED_PRESENT });
  }

  return present({ moduleName, logger, case: OBJ_RELATIONSHIP_NOT_FOUND_PRESENT });
};

exports.presentNotAuthorized = (moduleName, logger) => present({ moduleName, logger, case: OBJ_NOT_AUTHORIZED_PRESENT });

exports.presentNotAuthenticated = (moduleName, logger) => present({ moduleName, logger, case: OBJ_NOT_AUTHENTICATED_PRESENT });
