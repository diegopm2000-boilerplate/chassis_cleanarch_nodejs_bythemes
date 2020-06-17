// AppLogger.js

class AppLogger {
  static log(logger, className, header, message, level) {
    const completeMessage = `${className} ${header} --> ${message}`;
    if (!level) {
      logger.debug(completeMessage);
    } else {
      logger[`${level}`](completeMessage);
    }
  }

  static logIn(logger, className, message, level) {
    this.log(logger, className, '(IN) ', message, level);
  }

  static logMid(logger, className, message, level) {
    this.log(logger, className, '(MID)', message, level);
  }

  static logOut(logger, className, message, level) {
    this.log(logger, className, '(OUT)', message, level);
  }

  static logError(logger, className, message) {
    this.log(logger, className, '(ERROR)', message, 'error');
  }
}

module.exports = AppLogger;
