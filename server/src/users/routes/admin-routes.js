const AdminRoutes = require("express").Router();

const { isAdminAuth, isAuthorized } = require("../../middlewares/auth");
const {
  getAdminById,
  getAllCreatedIncidentsController
} = require("../controllers/admins-controllers");

AdminRoutes.get("/", isAuthorized, getAdminById);
AdminRoutes.get("/incidents", isAuthorized, isAdminAuth, getAllCreatedIncidentsController);

module.exports = AdminRoutes;
