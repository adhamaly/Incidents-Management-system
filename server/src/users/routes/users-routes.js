const UserRoutes = require("express").Router();
const { isAuthorized, isAdminAuth } = require("../../middlewares/auth");
const {
  getAllUsersController,
  getUserByIdController,
  getAssignedIncidentsController
} = require("../controllers/users-controllers");

UserRoutes.get("/", isAuthorized, isAdminAuth, getAllUsersController);
UserRoutes.get("/incidents", isAuthorized, getAssignedIncidentsController);
UserRoutes.get("/:userId", isAuthorized, getUserByIdController);

module.exports = UserRoutes;
