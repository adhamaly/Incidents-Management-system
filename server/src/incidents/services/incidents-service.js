const IncidentsRepository = require("../repositories/incidents-repository");
const AbstractError = require("../../errors/abstract-error");
const NotFoundException = require("../../errors/not-found-exception");
const { default: mongoose } = require("mongoose");
const IncidentsModel = require("../data-models/incidents-data-model");

class IncidentsService {
  constructor() {
    this.incidentsRepository = new IncidentsRepository();
    this.incidentStatus = {
      pending: "PENDING",
      user_acknowledge: "USER_ACKNOWLEDGE",
      resolved: "RESOLVED"
    };
    this.statusHirarchy = {
      "": [this.incidentStatus.pending],
      [this.incidentStatus.pending]: [this.incidentStatus.user_acknowledge],
      [this.incidentStatus.user_acknowledge]: [this.incidentStatus.resolved],
      [this.incidentStatus.resolved]: [""]
    };
  }

  async createIncident(body, adminId) {
    return await this.incidentsRepository.create(body, adminId);
  }

  async findById(incidentId) {
    const incident = await this.incidentsRepository.getById(incidentId);
    if (!incident) throw new NotFoundException("incident not found");

    return incident;
  }

  async findAll(query, accountId, role) {
    const queryObj = { ...query };

    const excludedFields = ["page", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const page = query.page * 1 || 1;
    const limit = query.limit * 1 || 25;
    const skip = (page - 1) * limit;

    const incidents = await this.incidentsRepository.findAll(
      queryObj,
      accountId,
      role,
      skip,
      limit
    );
    const count = await this.incidentsRepository.count(queryObj);

    return {
      incidents,
      totalPages: Math.ceil(count / limit)
    };
  }

  async setIncidentUserAcknowledge(incidentId) {
    const incident = await this.incidentsRepository.getById(incidentId);
    if (!incident) throw new NotFoundException("incident not found");

    if (!this.statusHirarchy[incident.status].includes(this.incidentStatus.user_acknowledge))
      throw new AbstractError("status not valid", 405);

    await this.incidentsRepository.updateIncidentStatus(
      incidentId,
      this.incidentStatus.user_acknowledge
    );
  }

  async setIncidentResolved(incidentId) {
    const incident = await this.incidentsRepository.getById(incidentId);
    if (!incident) throw new NotFoundException("incident not found");

    if (!this.statusHirarchy[incident.status].includes(this.incidentStatus.resolved))
      throw new AbstractError("status not valid", 405);

    await this.incidentsRepository.updateIncidentStatus(incidentId, this.incidentStatus.resolved);
  }

  async deleteIncidentById(incidentId) {
    const incident = await this.incidentsRepository.getById(incidentId);
    if (!incident) throw new NotFoundException("incident not found");

    if (!this.statusHirarchy[incident.status].includes(""))
      throw new AbstractError("status not valid for deletion", 405);

    await this.incidentsRepository.deleteById(incidentId);
  }
}

module.exports = IncidentsService;
