// passwordInfra.js

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;

exports.generateEncryptedPassword = (password) => bcrypt.hashSync(password, SALT_ROUNDS);

exports.checkPassword = async (password, encryptedPassword) => bcrypt.compare(password, encryptedPassword);
