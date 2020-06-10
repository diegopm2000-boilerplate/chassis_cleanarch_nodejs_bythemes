// sequelizeInfra.js

const { Sequelize } = require('sequelize');

const container = require('../container/container');

let sequelize;

exports.init = (options) => {
  sequelize = new Sequelize(options.dbname, options.dbuser, options.dbpasswd, {
    host: options.dbhost,
    dialect: options.dbdialect,
    define: {
      timestamps: false, // I don't want timestamp fields by default
    },
  });

  if (options.models && options.models.length > 0) {
    options.models.forEach((x) => {
      container.get(x).init();
    });
  }

  if (options.models && options.models.length > 0) {
    options.models.forEach((x) => {
      container.get(x).initAssociations();
    });
  }
};

exports.getSequelize = () => sequelize;
