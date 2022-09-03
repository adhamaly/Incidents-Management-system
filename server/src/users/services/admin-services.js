const NotFoundException = require("../../errors/not-found-exception");
const AdminRepository = require("../repositories/admin-repository");
const IncidentsService = require("../../incidents/services/incidents-service");

class AdminsService {
  constructor() {
    this.adminRepositoryInstance = new AdminRepository();
    this.incidentsService = new IncidentsService();
  }

  async findById(id) {
    return this.adminRepositoryInstance.getAdminById(id);
  }

  async getAllCreatedIncidents(query, adminId) {
    return await this.incidentsService.findAll(query, adminId, "admin");
  }
}
module.exports = AdminsService;
