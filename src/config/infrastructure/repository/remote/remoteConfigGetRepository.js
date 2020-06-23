// remoteConfigGetRepository.js

const axios = require('axios');
const YAML = require('yaml');

const fileInfra = require('../../../../shared/infrastructure/util/fileInfra');

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({ endpoint, configFile }) => {
  const innerResult = await axios.get(`${endpoint}/${configFile}`);
  return (fileInfra.isYamlFile(configFile)) ? YAML.parse(innerResult.data) : innerResult.data;
};
