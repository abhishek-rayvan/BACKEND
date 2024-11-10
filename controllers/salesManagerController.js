const Labour = require("../models/Labour");

exports.addLabour = async (req, res) => {
  const { name } = req.body;
  const labour = new Labour({ name, salesManagerId: req.user.id });
  await labour.save();
  res.json(labour);
};

const User = require("../models/user"); // Assuming the User model is used for both Sales Managers and Labours
const Attendance = require("../models/Attendance"); // Model to track Labour in-time and out-time

// Add a new Labour by Sales Manager
exports.addLabour = async (req, res) => {
  const { username, password } = req.body;
  const salesManagerId = req.user.userId;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const labour = new User({
      username,
      password: hashedPassword,
      role: "Labour",
      assignedSalesManager: salesManagerId,
    });

    await labour.save();
    res.status(201).json(labour);
  } catch (error) {
    console.error("Error adding Labour:", error);
    res.status(500).json({ message: "Failed to add Labour" });
  }
};

// List all Labours managed by the Sales Manager
exports.listLabours = async (req, res) => {
  const salesManagerId = req.user.userId;

  try {
    const labours = await User.find({ role: "Labour", assignedSalesManager: salesManagerId });
    res.status(200).json(labours);
  } catch (error) {
    console.error("Error listing Labours:", error);
    res.status(500).json({ message: "Failed to list Labours" });
  }
};

// Update Labour's information (within Sales Manager’s area)
exports.updateLabour = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const salesManagerId = req.user.userId;

  try {
    const labour = await User.findOneAndUpdate(
      { _id: id, role: "Labour", assignedSalesManager: salesManagerId },
      { username },
      { new: true }
    );

    if (!labour) {
      return res.status(404).json({ message: "Labour not found or not authorized to update" });
    }

    res.status(200).json(labour);
  } catch (error) {
    console.error("Error updating Labour:", error);
    res.status(500).json({ message: "Failed to update Labour" });
  }
};

// Track Labour in-time and out-time
exports.trackLabourTime = async (req, res) => {
  const { id } = req.params;
  const salesManagerId = req.user.userId;

  try {
    const labour = await User.findOne({ _id: id, role: "Labour", assignedSalesManager: salesManagerId });
    if (!labour) {
      return res.status(404).json({ message: "Labour not found or not authorized to track" });
    }

    const attendanceRecords = await Attendance.find({ labourId: id });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error("Error tracking Labour time:", error);
    res.status(500).json({ message: "Failed to track Labour time" });
  }
};


