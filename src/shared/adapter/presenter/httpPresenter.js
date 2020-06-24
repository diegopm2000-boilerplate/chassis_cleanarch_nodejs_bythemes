// httpPresenter.js

// //////////////////////////////////////////////////////////////////////////////
// Private Methods
// //////////////////////////////////////////////////////////////////////////////

const MSG_NOT_AUTHORIZED = { status: 401, data: { code: 401, message: 'User not authorized to resource' } };
const MSG_NOT_AUTHENTICATED = { status: 403, data: { code: 403, message: 'User not authenticated in the system' } };
const MGS_OBJECT_NOT_FOUND = { status: 404, data: { code: 404, message: 'Object not found in the system' } };
const MSG_RELATIONSHIP_NOT_FOUND = { status: 404, data: { code: 404, message: 'Relationship not found in the system' } };
const MSG_OBJECT_DELETED = { status: 204, data: null };

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.presentObject = (object) => ({ status: 200, data: object });

exports.presentCreatedObject = (object) => ({ status: 201, data: object });

exports.presentConflict = (errorObj) => {
  const message = (Array.isArray(errorObj) && errorObj.length > 0) ? errorObj[0] : errorObj;
  return { status: 409, data: { code: 409, message } };
};

exports.presentNotAuthorized = () => (MSG_NOT_AUTHORIZED);

exports.presentNotAuthenticated = () => (MSG_NOT_AUTHENTICATED);

exports.presentObjectNotFound = () => (MGS_OBJECT_NOT_FOUND);

exports.presentObjectIfFound = (object) => {
  const result = (object) ? { code: 200, data: object } : MGS_OBJECT_NOT_FOUND;
  return result;
};

exports.presentResultOfDeletion = (wasDeleted) => {
  const result = (wasDeleted) ? MSG_OBJECT_DELETED : MGS_OBJECT_NOT_FOUND;
  return result;
};

exports.presentResultOfRelationshipDeletion = (wasDeleted) => {
  const result = (wasDeleted) ? MSG_OBJECT_DELETED : MSG_RELATIONSHIP_NOT_FOUND;
  return result;
};
