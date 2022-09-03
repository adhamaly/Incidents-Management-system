const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IncidentsSchema = new Schema(
  {
    description: { type: String },
    requestCode: { type: String, unique: true },
    caller: { type: Schema.Types.ObjectId, ref: "user" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "user" },
    type: { type: String },
    status: { type: String, default: "PENDING" }
  },
  {
    timestamps: true
  }
);

const IncidentsModel = mongoose.model("incident", IncidentsSchema);
module.exports = IncidentsModel;
