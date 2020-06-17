// fileInfra.js

const readFilePromise = require('fs-readfile-promise');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const YAML = require('yaml');

// //////////////////////////////////////////////////////////////////////////////
// Private Functions
// //////////////////////////////////////////////////////////////////////////////

const checkExtension = (filepath) => {
  if (!exports.isYamlFile(filepath) && !exports.isJSONFile(filepath)) {
    throw new Error('File extension not supported. Only yaml, yml or json files allowed');
  }
};

const parseFile = (filepath, buffer) => {
  if (exports.isYamlFile(filepath)) {
    return YAML.parse(buffer.toString());
  }

  return JSON.parse(buffer.toString()); // we assume that it will be a json file
};

// //////////////////////////////////////////////////////////////////////////////
// Public Functions
// //////////////////////////////////////////////////////////////////////////////

exports.loadObjFromFile = async (filepath) => {
  checkExtension(filepath);
  const buffer = await readFilePromise(filepath);
  return parseFile(filepath, buffer);
};

exports.loadObjFromFileSync = (filepath) => {
  checkExtension(filepath);
  const buffer = fs.readFileSync(filepath);
  return parseFile(filepath, buffer);
};

exports.getAllModuleNames = (filepath) => glob.sync(`${filepath}/**/*.js`);

exports.getFileName = (filepath) => path.basename(filepath);

exports.isYamlFile = (filepath) => filepath.endsWith('yml') || filepath.endsWith('yaml');

exports.isJSONFile = (filepath) => filepath.endsWith('json');
