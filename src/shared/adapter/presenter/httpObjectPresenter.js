// httpObjectPresenter.js

// //////////////////////////////////////////////////////////////////////////////
// Constants & Properties
// //////////////////////////////////////////////////////////////////////////////

const OBJ_PRESENT = 'objPresent';
const OBJ_LIST_PRESENT = 'objListPresent';
const OBJ_CREATED_PRESENT = 'objCreatedPresent';
const OBJ_DELETED_PRESENT = 'objDeletedPresent';
const OBJ_NOT_FOUND_PRESENT = 'objNotFoundPresent';
const OBJ_MOD_CONFLICT_PRESENT = 'objModConflictPresent';
const OBJ_RELATIONSHIP_NOT_FOUND_PRESENT = 'relationshipNotFoundPresent';
const OBJ_NOT_AUTHENTICATED_PRESENT = 'notAuthenticatedPresent';
const OBJ_NOT_AUTHORIZED_PRESENT = 'notAuthorizedPresent';

// //////////////////////////////////////////////////////////////////////////////
// Private methods
// //////////////////////////////////////////////////////////////////////////////

const present = (options) => {
  let result;

  switch (options.case) {
    case OBJ_PRESENT: case OBJ_LIST_PRESENT:
      result = { code: 200, data: options.object };
      break;
    case OBJ_CREATED_PRESENT:
      result = { code: 201, data: options.object };
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

// //////////////////////////////////////////////////////////////////////////////
// Public methods
// //////////////////////////////////////////////////////////////////////////////

exports.presentNotAuthorized = (moduleName, logger) => present({ moduleName, logger, case: OBJ_NOT_AUTHORIZED_PRESENT });

exports.presentNotAuthenticated = (moduleName, logger) => present({ moduleName, logger, case: OBJ_NOT_AUTHENTICATED_PRESENT });

exports.presentObjectNotFound = (moduleName, logger) => present({ moduleName, logger, case: OBJ_NOT_FOUND_PRESENT });

exports.presentObject = (moduleName, logger, object) => present({
  moduleName, logger, case: OBJ_PRESENT, object,
});

exports.presentCreatedObject = (moduleName, logger, object) => present({
  moduleName, logger, case: OBJ_CREATED_PRESENT, object,
});

exports.presentObjectIfFound = (moduleName, logger, object) => {
  const presentCase = (object) ? OBJ_PRESENT : OBJ_NOT_FOUND_PRESENT;
  return present({
    moduleName, logger, case: presentCase, object,
  });
};

exports.presentResultOfDeletion = (moduleName, logger, wasDeleted) => {
  const presentCase = (wasDeleted) ? OBJ_DELETED_PRESENT : OBJ_NOT_FOUND_PRESENT;
  return present({ moduleName, logger, case: presentCase });
};

exports.presentResultOfRelationshipDeletion = (moduleName, logger, wasDeleted) => {
  const presentCase = (wasDeleted) ? OBJ_DELETED_PRESENT : OBJ_RELATIONSHIP_NOT_FOUND_PRESENT;
  return present({ moduleName, logger, case: presentCase });
};

exports.presentConflict = (moduleName, logger, errors) => {
  const message = (Array.isArray(errors) && errors.length > 0) ? errors[0] : errors;
  return present({
    moduleName, logger, case: OBJ_MOD_CONFLICT_PRESENT, message,
  });
};
