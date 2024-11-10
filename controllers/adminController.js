const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Function to create a new Sales Manager
exports.createSalesManager = async (req, res) => {
  try {
    const { username, password, location } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const salesManager = new User({
      username,
      password: hashedPassword,
      role: "SalesManager",
      location,
    });

    await salesManager.save();
    res.status(201).json(salesManager);
  } catch (error) {
    console.error("Error creating Sales Manager:", error);
    res.status(500).json({ message: "Failed to create Sales Manager" });
  }
};

// Function to list all Sales Managers
exports.listSalesManagers = async (req, res) => {
  try {
    const salesManagers = await User.find({ role: "SalesManager" });
    res.status(200).json(salesManagers);
  } catch (error) {
    console.error("Error listing Sales Managers:", error);
    res.status(500).json({ message: "Failed to list Sales Managers" });
  }
};

// Function to update a Sales Manager's information
exports.updateSalesManager = async (req, res) => {
  const { id } = req.params;
  const { username, location } = req.body;

  try {
    const updatedSalesManager = await User.findByIdAndUpdate(
      id,
      { username, location },
      { new: true }
    );

    if (!updatedSalesManager) {
      return res.status(404).json({ message: "Sales Manager not found" });
    }

    res.status(200).json(updatedSalesManager);
  } catch (error) {
    console.error("Error updating Sales Manager:", error);
    res.status(500).json({ message: "Failed to update Sales Manager" });
  }
};

// Function to delete a Sales Manager
exports.deleteSalesManager = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSalesManager = await User.findByIdAndDelete(id);

    if (!deletedSalesManager) {
      return res.status(404).json({ message: "Sales Manager not found" });
    }

    res.status(200).json({ message: "Sales Manager deleted successfully" });
  } catch (error) {
    console.error("Error deleting Sales Manager:", error);
    res.status(500).json({ message: "Failed to delete Sales Manager" });
  }
};

// Function to get the location of a Sales Manager
exports.getSalesManagerLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const salesManager = await User.findById(id);

    if (!salesManager || salesManager.role !== "SalesManager") {
      return res.status(404).json({ message: "Sales Manager not found" });
    }

    res.status(200).json({ location: salesManager.location });
  } catch (error) {
    console.error("Error retrieving Sales Manager location:", error);
    res.status(500).json({ message: "Failed to retrieve location" });
  }
};

// Function to create a new Labour
exports.createLabour = async (req, res) => {
  try {
    const { username, password, assignedSalesManager } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const labour = new User({
      username,
      password: hashedPassword,
      role: "Labour",
      assignedSalesManager,
    });

    await labour.save();
    res.status(201).json(labour);
  } catch (error) {
    console.error("Error creating Labour:", error);
    res.status(500).json({ message: "Failed to create Labour" });
  }
};

// Function to list all Labours
exports.listLabours = async (req, res) => {
  try {
    const labours = await User.find({ role: "Labour" });
    res.status(200).json(labours);
  } catch (error) {
    console.error("Error listing Labours:", error);
    res.status(500).json({ message: "Failed to list Labours" });
  }
};

// Function to update a Labour's information
exports.updateLabour = async (req, res) => {
  const { id } = req.params;
  const { username, assignedSalesManager } = req.body;

  try {
    const updatedLabour = await User.findByIdAndUpdate(
      id,
      { username, assignedSalesManager },
      { new: true }
    );

    if (!updatedLabour) {
      return res.status(404).json({ message: "Labour not found" });
    }

    res.status(200).json(updatedLabour);
  } catch (error) {
    console.error("Error updating Labour:", error);
    res.status(500).json({ message: "Failed to update Labour" });
  }
};

// Function to delete a Labour
exports.deleteLabour = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedLabour = await User.findByIdAndDelete(id);

    if (!deletedLabour) {
      return res.status(404).json({ message: "Labour not found" });
    }

    res.status(200).json({ message: "Labour deleted successfully" });
  } catch (error) {
    console.error("Error deleting Labour:", error);
    res.status(500).json({ message: "Failed to delete Labour" });
  }
};
