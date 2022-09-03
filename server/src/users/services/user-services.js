const NotFoundException = require("../../errors/not-found-exception");
const UserRepository = require("../repositories/user-repository");
const IncidentsService = require("../../incidents/services/incidents-service");

class UsersService {
  constructor() {
    this.userRepositoryInstance = new UserRepository();
    this.incidentsService = new IncidentsService();
  }

  async findAll() {
    return this.userRepositoryInstance.getAllUsers();
  }

  async findById(id) {
    const user = this.userRepositoryInstance.getUserById(id);
    if (!user) throw new NotFoundException("user not found");

    return user;
  }
  async getAssignedIncidents(query, userId) {
    return await this.incidentsService.findAll(query, userId, "user");
  }
}
module.exports = UsersService;
