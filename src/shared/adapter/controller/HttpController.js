// HttpController.js

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

const BaseController = require('./BaseController');

class HttpController extends BaseController {
  constructor(args) {
    super(args);
    this.requestParser = args.requestParser;
  }

  sendResponse(className, result, res) {
    this.logOut(className, result);
    res.status(result.code).json(result.data);
  }
}

module.exports = HttpController;
