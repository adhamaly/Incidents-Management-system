const UsersService = require("../services/user-services");
const userService = new UsersService();

async function getAllUsersController(req, res) {
  const result = await userService.findAll();

  res.status(200).json({
    success: true,
    data: result
  });
}

async function getUserByIdController(req, res) {
  const result = await userService.findById(req.params.userId);

  res.status(200).json({
    success: true,
    data: { ...result._doc }
  });
}

async function getAssignedIncidentsController(req, res) {
  const result = await userService.getAssignedIncidents(req.query, req.user.id);

  res.status(200).json({
    success: true,
    total_pages: result.totalPages,
    data: result.incidents
  });
}

module.exports = {
  getUserByIdController,
  getAllUsersController,
  getAssignedIncidentsController
};
