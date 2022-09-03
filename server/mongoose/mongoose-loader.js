const mongoose = require("mongoose");
const AdminRepository = require("../src/users/repositories/admin-repository");
const adminRepo = new AdminRepository();
const UserRepository = require("../src/users/repositories/user-repository");
const userRepo = new UserRepository();

async function initializeAdmin() {
  if (!(await adminRepo.getAdminByUserName("admin11"))) {
    await adminRepo.createAdmin();
    console.log("admin initialized");
  }
}

async function seedDataBaseWithUsers() {
  const users = await userRepo.getAllUsers();
  if (!users.length) {
    await userRepo.createUser();
    console.log("users injected");
  }
}
module.exports = () => {
  const DB = process.env.DB_DEV;
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      console.info("Connected to MongoDB...");
      await initializeAdmin();
      await seedDataBaseWithUsers();
    })
    .catch((err) => console.error(`Couldn't connect to MongoDB... `, err));
};
