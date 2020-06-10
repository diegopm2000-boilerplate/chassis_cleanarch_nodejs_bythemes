// getAdministratorIdFromToken

// TODO ya no se debería usar

exports.execute = (moduleName, commonProxyInfra, presenter, logger, tokenIN) => {
  // Extract the token from tokenbearer
  const token = commonProxyInfra.get('jwtInfra').cleanToken(tokenIN);
  if (token == null) {
    logger.info(`${moduleName} (MID) --> token format not valid`);
    return presenter.present({ case: presenter.OBJ_NOT_AUTHORIZED_PRESENT });
  }

  // Extract administratorInfo from token
  const administratorInfo = commonProxyInfra.get('jwtInfra').getUserInfoFromToken(token);

  // Build Result
  const { id } = administratorInfo;
  logger.info(`${moduleName} (MID) --> administrator Id: ${id}`);

  // Return result
  return id;
};
