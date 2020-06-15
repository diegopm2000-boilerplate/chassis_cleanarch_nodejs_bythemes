// GenericController.js

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

class GenericController {
  constructor(options) {
    this.presenter = options.presenter;
    this.uc = options.uc;
    this.logger = options.logger;
    this.repository = options.repository;
  }

  async execute(req, res, next) {
    throw Error('Not defined yet!');
  }
}

module.exports = GenericController;
