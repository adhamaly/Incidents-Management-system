const jwt = require("jsonwebtoken");
const Forbidden = require("../errors/forbidden-exception");
const NotFoundException = require("../errors/not-found-exception");
const UserModel = require("../users/data-models/user-data-model");

function createToken(user, role) {
  return jwt.sign({ id: user._id, role: role }, process.env.ACCESS_TOKEN_SECRET);
}
function isAuthorized(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  try {
    //reload payload from token into decoded
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) throw new Forbidden();

    // Inject payload into req
    req.user = decoded;
  } catch (err) {
    throw new Forbidden();
  }
  return next();
}
async function isAdminAuth(req, res, next) {
  const id = req.user.id;
  // check admin
  const adminExistance = await UserModel.findOne({ _id: id, isAdmin: true });
  if (!adminExistance) throw new NotFoundException();

  return next();
}

async function isTechnicalUser(req, res, next) {
  const id = req.user.id;
  // check user
  const userExistance = await UserModel.findOne({ _id: id, isAdmin: false });
  if (!userExistance) throw new NotFoundException();

  return next();
}

module.exports = {
  createToken,
  isAuthorized,
  isAdminAuth,
  isTechnicalUser
};
