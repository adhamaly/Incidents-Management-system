const IncidentsModel = require("../data-models/incidents-data-model");
const crypto = require("crypto");

class IncidentsRepository {
  constructor() {}

  async create(data, caller) {
    const { description, assignedTo, type } = data;

    const requestCode = crypto.randomBytes(4).toString("hex");

    return await IncidentsModel.create({
      description,
      type,
      assignedTo: assignedTo,
      caller: caller,
      requestCode
    });
  }

  async findAll(queryObj, accountId, role, skip, limit) {
    return await IncidentsModel.find({
      ...queryObj,
      ...(role === "admin" ? { caller: accountId } : { assignedTo: accountId })
    })
      .populate({ path: role === "admin" ? "assignedTo" : "caller", select: "name" })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async count(queryObj) {
    return await IncidentsModel.find({ ...queryObj }).count();
  }

  async getById(id) {
    return await IncidentsModel.findById(id);
  }

  async updateIncidentStatus(id, status) {
    await IncidentsModel.updateOne({ _id: id }, { status });
  }

  async deleteById(id) {
    await IncidentsModel.deleteOne({ _id: id });
  }
}

module.exports = IncidentsRepository;
