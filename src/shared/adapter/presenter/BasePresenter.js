// BasePresenter.js

const AppLogger = require('../../infrastructure/log/AppLogger');

class BasePresenter {
  static presentObject(logger, className, object, level) {
    AppLogger.logOut(logger, className, `result: ${JSON.stringify(object)}`, level);
    return object;
  }
}

module.exports = BasePresenter;
