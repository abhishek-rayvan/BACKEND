const Attendance = require("../models/Attendance");
const Salary = require("../models/Salary");

exports.manageAttendance = async (req, res) => {
  // Handle attendance logic here
  res.json({ message: "Attendance managed" });
};

exports.calculateSalary = async (req, res) => {
  // Handle salary calculations here
  res.json({ message: "Salary calculated" });
};


const Attendance = require("../models/Attendance");
const Salary = require("../models/Salary");
const User = require("../models/user");

// Manage attendance by adding or updating an attendance record for a Labour
exports.manageAttendance = async (req, res) => {
  const { labourId, date, inTime, outTime } = req.body;

  try {
    let attendanceRecord = await Attendance.findOne({ labourId, date });

    if (attendanceRecord) {
      attendanceRecord.inTime = inTime;
      attendanceRecord.outTime = outTime;
      await attendanceRecord.save();
    } else {
      attendanceRecord = new Attendance({ labourId, date, inTime, outTime });
      await attendanceRecord.save();
    }

    res.status(200).json({ message: "Attendance record updated", attendanceRecord });
  } catch (error) {
    console.error("Error managing attendance:", error);
    res.status(500).json({ message: "Failed to manage attendance" });
  }
};

// View all attendance records for Labours
exports.viewAttendance = async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate("labourId", "username role");
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error viewing attendance:", error);
    res.status(500).json({ message: "Failed to retrieve attendance records" });
  }
};

// Calculate salary for a Labour based on attendance and hourly rate
exports.calculateSalary = async (req, res) => {
  const { labourId, hourlyRate } = req.body;

  try {
    const attendanceRecords = await Attendance.find({ labourId });
    let totalHours = 0;

    attendanceRecords.forEach(record => {
      const hoursWorked = (new Date(record.outTime) - new Date(record.inTime)) / (1000 * 60 * 60);
      totalHours += hoursWorked;
    });

    const salaryAmount = totalHours * hourlyRate;

    const salaryRecord = new Salary({ labourId, totalHours, salaryAmount });
    await salaryRecord.save();

    res.status(200).json({ message: "Salary calculated and saved", salaryRecord });
  } catch (error) {
    console.error("Error calculating salary:", error);
    res.status(500).json({ message: "Failed to calculate salary" });
  }
};

// View all salary records
exports.viewSalary = async (req, res) => {
  try {
    const salaryRecords = await Salary.find().populate("labourId", "username role");
    res.status(200).json(salaryRecords);
  } catch (error) {
    console.error("Error viewing salary records:", error);
    res.status(500).json({ message: "Failed to retrieve salary records" });
  }
};


