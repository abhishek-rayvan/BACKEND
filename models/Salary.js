const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  employeeId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  datePaid: Date,
});

module.exports = mongoose.model("Salary", salarySchema);
