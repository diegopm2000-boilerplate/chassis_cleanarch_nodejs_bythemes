// fileConfigGetRepository.js

const fileInfra = require('../../../../shared/infrastructure/util/fileInfra');
const constants = require('../../../../shared/infrastructure/constants/constants');

// //////////////////////////////////////////////////////////////////////////////
// Public Methods
// //////////////////////////////////////////////////////////////////////////////

exports.execute = async ({ configFile }) => fileInfra.loadObjFromFile(`${constants.CONFIG_BASEPATH}/${configFile}`);
