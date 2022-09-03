const AuthRoutes = require("express").Router();

const { authLoginController } = require("./auth-controllers");
const { loginAuthValidation } = require("./auth-validation");

AuthRoutes.post("/login", loginAuthValidation, authLoginController);

module.exports = AuthRoutes;
