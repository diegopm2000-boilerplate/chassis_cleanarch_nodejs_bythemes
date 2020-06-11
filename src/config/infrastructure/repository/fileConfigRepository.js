// fileConfigRepository.js

const container = require('../../../shared/infrastructure/container/container');
const constants = require('../../../shared/constants/constants');

exports.getConfig = async (filename) => {
  const result = await container.get('fileInfra').loadObjFromFile(`${constants.CONFIG_BASEPATH}/${filename}`);
  return result;
};
