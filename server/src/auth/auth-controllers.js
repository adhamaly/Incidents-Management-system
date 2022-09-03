const NotFoundException = require("../errors/not-found-exception");
const { createToken } = require("../middlewares/auth");
const UserModel = require("../users/data-models/user-data-model");

async function authLoginController(req, res) {
  const userOrAdmin = await UserModel.findOne({ userName: req.body.userName });
  if (!userOrAdmin) throw new NotFoundException("not found");

  const accessToken = createToken(userOrAdmin, userOrAdmin.isAdmin ? "admin" : "user");

  res.status(200).json({
    success: true,
    data: {
      ...userOrAdmin._doc,
      role: userOrAdmin.isAdmin ? "admin" : "user",
      access_token: accessToken
    }
  });
}

module.exports = { authLoginController };
