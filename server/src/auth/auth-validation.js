const { check } = require("express-validator");
const errorHandler = require("../middlewares/handle-errors");

const loginAuthValidation = [
  check("userName").trim().notEmpty().withMessage("userName is required"),
  errorHandler
];

module.exports = {
  loginAuthValidation
};
