const IncidentsService = require("../services/incidents-service");
const incidentService = new IncidentsService();

async function createIncidentsController(req, res) {
  const createdIncident = await incidentService.createIncident(req.body, req.user.id);

  res.status(200).json({
    success: true,
    data: {
      ...createdIncident._doc
    }
  });
}

async function queryIncidentsControllers(req, res) {
  const result = await incidentService.findAll(req.query);

  res.status(200).json({
    success: true,
    total_pages: result.totalPages,
    data: result.incidents
  });
}
async function getIncidentByIdController(req, res) {
  const incidentDocumet = await incidentService.findById(req.params.incidentId);

  res.status(200).json({
    success: true,
    data: {
      ...incidentDocumet._doc
    }
  });
}

async function setIncidentUserAcknowledgeController(req, res) {
  await incidentService.setIncidentUserAcknowledge(req.params.incidentId);

  res.status(200).json({
    success: true
  });
}

async function setIncidentResolvedController(req, res) {
  await incidentService.setIncidentResolved(req.params.incidentId);

  res.status(200).json({
    success: true
  });
}

async function deleteIncidentController(req, res) {
  await incidentService.deleteIncidentById(req.params.incidentId);

  res.status(200).json({
    success: true,
    msg: "deleted successfully"
  });
}

module.exports = {
  createIncidentsController,
  getIncidentByIdController,
  setIncidentUserAcknowledgeController,
  setIncidentResolvedController,
  deleteIncidentController,
  queryIncidentsControllers
};
