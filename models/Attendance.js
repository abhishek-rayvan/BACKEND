const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  labourId: mongoose.Schema.Types.ObjectId,
  date: Date,
  present: Boolean,
});

module.exports = mongoose.model("Attendance", attendanceSchema);
