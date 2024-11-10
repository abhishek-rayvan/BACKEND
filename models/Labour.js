const mongoose = require("mongoose");

const labourSchema = new mongoose.Schema({
  name: String,
  salesManagerId: mongoose.Schema.Types.ObjectId,
  inTime: Date,
  outTime: Date,
  tasks: [String],
});

module.exports = mongoose.model("Labour", labourSchema);
