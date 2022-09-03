const AdminsService = require("../services/admin-services");
const adminService = new AdminsService();

async function getAdminById(req, res) {
  const result = await adminService.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: { ...result._doc }
  });
}

async function getAllCreatedIncidentsController(req, res) {
  const result = await adminService.getAllCreatedIncidents(req.query, req.user.id);

  res.status(200).json({
    success: true,
    total_pages: result.totalPages,
    data: result.incidents
  });
}

module.exports = {
  getAdminById,
  getAllCreatedIncidentsController
};
