const AbstractError = require("./abstract-error");

/**
 * @example throw new MethodNotAllowed()
 */
class MethodNotAllowed extends AbstractError {
  constructor(message = "Method Not Allowed") {
    super(message);
    this.name = "MethodNotAllowed";
    this.statusCode = 405;
  }
}

module.exports = MethodNotAllowed;
