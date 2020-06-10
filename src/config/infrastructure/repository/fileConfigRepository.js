// fileConfigRepository.js

const container = require('../../../shared/infrastructure/container/container');

const CONFIG_BASEPATH = './config';

exports.getConfig = async (filename) => {
  const result = await container.get('fileInfra').loadObjFromFile(`${CONFIG_BASEPATH}/${filename}`);
  return result;
};
