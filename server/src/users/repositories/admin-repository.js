const UserModel = require("../data-models/user-data-model");

class AdminRepository {
  constructor() {}

  async createAdmin() {
    await UserModel.create([
      {
        name: "Yassir Omar",
        userName: "admin11",
        isAdmin: true
      }
    ]);
  }

  async getAdminById(id) {
    return await UserModel.findById(id);
  }

  async getAllAdmins() {
    return await UserModel.find({ isAdmin: true });
  }

  async getAdminByUserName(userName) {
    return await UserModel.findOne({ userName: userName, isAdmin: true });
  }
}

module.exports = AdminRepository;
