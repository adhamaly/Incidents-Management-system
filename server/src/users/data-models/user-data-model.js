const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  userName: { type: String, unique: true },
  isAdmin: { type: Boolean, default: false }
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
