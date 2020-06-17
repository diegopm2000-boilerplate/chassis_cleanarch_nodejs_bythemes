// HttpController.js

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

  handleError(error, next) {
    this.logError(error, next);
    next(new Error('Internal Error'));
  }
}

module.exports = HttpController;
