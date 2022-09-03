const IncidentsRoutes = require("express").Router();
const { isAuthorized, isAdminAuth, isTechnicalUser } = require("../../middlewares/auth");
const {
  createIncidentsController,
  getIncidentByIdController,
  setIncidentUserAcknowledgeController,
  setIncidentResolvedController,
  deleteIncidentController,
  queryIncidentsControllers
} = require("../controllers/incidents-controllers");
const { incidentCreation } = require("../validations/incidents-validations");

IncidentsRoutes.post("/", isAuthorized, isAdminAuth, incidentCreation, createIncidentsController);
IncidentsRoutes.get("/", isAuthorized, queryIncidentsControllers);
IncidentsRoutes.get("/:incidentId", isAuthorized, getIncidentByIdController);

IncidentsRoutes.put(
  "/:incidentId/user-acknowledge",
  isAuthorized,
  isTechnicalUser,
  setIncidentUserAcknowledgeController
);
IncidentsRoutes.put(
  "/:incidentId/user-resolve",
  isAuthorized,
  isTechnicalUser,
  setIncidentResolvedController
);

IncidentsRoutes.delete("/:incidentId", isAuthorized, deleteIncidentController);
module.exports = IncidentsRoutes;
