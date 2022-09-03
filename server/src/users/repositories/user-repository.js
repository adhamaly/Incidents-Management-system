const UserModel = require("../data-models/user-data-model");

class UserRepository {
  constructor() {}

  async createUser() {
    await UserModel.create([
      {
        name: "Ahmed Aly",
        userName: "user11"
      },
      {
        name: "Omar Akram",
        userName: "user12"
      },
      {
        name: "Adham Aly",
        userName: "user13"
      },
      {
        name: "Hossam Mohammed",
        userName: "user14"
      }
    ]);
  }

  async getUserById(id) {
    return await UserModel.findById(id);
  }

  async getAllUsers() {
    return await UserModel.find({ isAdmin: false });
  }

  async getUserByUserName(userName) {
    return await UserModel.findOne({ userName: userName, isAdmin: false });
  }
}

module.exports = UserRepository;
