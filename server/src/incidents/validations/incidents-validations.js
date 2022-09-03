const { check } = require("express-validator");
const errorHandler = require("../../middlewares/handle-errors");

const incidentCreation = [
  check("type").trim().notEmpty().withMessage("type is required"),
  check("description").trim().notEmpty().withMessage("description is required"),
  check("assignedTo")
    .trim()
    .notEmpty()
    .withMessage("assignedTo is required")
    .bail()
    .isMongoId()
    .withMessage("invalid input"),
  errorHandler
];

module.exports = {
  incidentCreation
};
