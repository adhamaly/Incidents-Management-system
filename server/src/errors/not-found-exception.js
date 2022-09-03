const AbstractError = require("./abstract-error");

/**
 * @example throw new NotFoundException('There is no incident-user with this id')
 */
class NotFoundException extends AbstractError {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundException";
    this.statusCode = 400;
  }
}

module.exports = NotFoundException;
