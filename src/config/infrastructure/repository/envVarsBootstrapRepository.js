// envVarsBootstrapRepository.js

exports.load = () => {
  const result = {
    configSource: process.env.NODE_CONFIG_SOURCE_APP,
    configFileName: process.env.NODE_CONFIG_FILE,
    configPort: process.env.NODE_CONFIG_PORT_APP,
    apiDoc: process.env.NODE_CONFIG_APIFILE,
    configEndpoint: process.env.NODE_CONFIG_SPRINGCFG_ENDPOINT,
  };
  return result;
};
