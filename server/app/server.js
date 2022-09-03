require("make-promises-safe");
require("express-async-errors");

const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const webServerRoutes = require("../routes/apiGateway");
const AbstractError = require("../src/errors/abstract-error");

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
module.exports = (app) => {
  app.use(compression({ filter: shouldCompress }));
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: "*"
    })
  );

  // Routing Middleware
  app.use("/api", webServerRoutes);

  // Error Middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof AbstractError) {
      return res
        .status(err.statusCode)
        .send({ success: false, errors: err.serializeErrors().flat() });
    }

    res.status(500).send({
      success: false,
      errors: [
        {
          message: "Something went wrong"
        }
      ]
    });
  });

  app.use((req, res, next) => {
    res.status(404).send({
      success: false,
      errors: [
        {
          message: "NotFound: there is no handler for this url"
        }
      ]
    });
  });
};
