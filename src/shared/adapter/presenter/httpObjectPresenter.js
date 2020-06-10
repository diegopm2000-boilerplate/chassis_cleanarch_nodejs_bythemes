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

  return result;
};

const presentObjectIfFound = (moduleName, logger, objectFound) => {
  let result;
  if (objectFound) {
    result = present({ case: OBJ_PRESENT, obj: objectFound });
  } else {
    result = present({ case: OBJ_NOT_FOUND_PRESENT });
  }

  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentObjectNotFound = (moduleName, logger) => {
  logger.debug(`${moduleName} (OUT) --> Object not found`);
  return present({ case: OBJ_NOT_FOUND_PRESENT });
};

const presentObject = (moduleName, logger, object) => {
  const result = present({ case: OBJ_PRESENT, obj: object });
  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentCreatedObject = (moduleName, logger, object) => {
  const result = present({ case: OBJ_CREATED_PRESENT, obj: object });
  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentConflict = (moduleName, logger, errors) => {
  let message;
  if (Array.isArray(errors)) {
    // eslint-disable-next-line prefer-destructuring
    message = errors[0];
  } else {
    message = errors;
  }

  const result = present({ case: OBJ_MOD_CONFLICT_PRESENT, message });
  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentResultOfDeletion = (moduleName, logger, wasDeleted) => {
  let result;
  if (wasDeleted) {
    result = present({ case: OBJ_DELETED_PRESENT });
  } else {
    result = present({ case: OBJ_NOT_FOUND_PRESENT });
  }

  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentResultOfRelationshipDeletion = (moduleName, logger, wasDeleted) => {
  let result;

  if (wasDeleted) {
    result = present({ case: OBJ_DELETED_PRESENT });
  } else {
    result = present({ case: OBJ_RELATIONSHIP_NOT_FOUND_PRESENT });
  }

  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentNotAuthorized = (moduleName, logger) => {
  const result = present({ case: OBJ_NOT_AUTHORIZED_PRESENT });
  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

const presentNotAuthenticated = (moduleName, logger) => {
  const result = present({ case: OBJ_NOT_AUTHENTICATED_PRESENT });
  logger.debug(`${moduleName} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};

module.exports = {
  present,
  presentObject,
  presentCreatedObject,
  presentObjectIfFound,
  presentObjectNotFound,
  presentConflict,
  presentResultOfDeletion,
  presentResultOfRelationshipDeletion,
  presentNotAuthorized,
  presentNotAuthenticated,
  OBJ_PRESENT,
  OBJ_LIST_PRESENT,
  OBJ_CREATED_PRESENT,
  OBJ_DELETED_PRESENT,
  OBJ_NOT_FOUND_PRESENT,
  OBJ_MOD_CONFLICT_PRESENT,
  OBJ_RELATIONSHIP_NOT_FOUND_PRESENT,
  OBJ_NOT_AUTHENTICATED_PRESENT,
  OBJ_NOT_AUTHORIZED_PRESENT,
};
