const webServerRoutes = require("express").Router();

const AuthRoutes = require("../src/auth/auth-routes");
const IncidentsRoutes = require("../src/incidents/routes/incidents-routes");
const AdminRoutes = require("../src/users/routes/admin-routes");
const UserRoutes = require("../src/users/routes/users-routes");

webServerRoutes.use("/auth", AuthRoutes);
webServerRoutes.use("/admins", AdminRoutes);
webServerRoutes.use("/users", UserRoutes);
webServerRoutes.use("/incidents", IncidentsRoutes);

module.exports = webServerRoutes;
