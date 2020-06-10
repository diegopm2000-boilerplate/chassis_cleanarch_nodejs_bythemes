// checkPermissionInAWorkspace

const MODULE_NAME = '[checkPermissionInAWorkspace UtilUC]';

exports.execute = async (commonProxyRepository, logger, params) => {
  logger.debug(`${MODULE_NAME} (IN) --> params: ${JSON.stringify(params)}`);

  // Business IN parameters
  const { workspaceId, userSessionInfo } = params;

  // Get all administrators from workspace
  const administrators = await commonProxyRepository.get('getAllAdministratorsRepository').execute(workspaceId);
  logger.debug(`${MODULE_NAME} (MID) --> administrators: ${JSON.stringify(administrators)}`);

  // Check Permission
  const result = administrators.find((x) => x.id === userSessionInfo.id);

  // Return Result
  logger.debug(`${MODULE_NAME} (OUT) --> result: ${JSON.stringify(result)}`);
  return result;
};
