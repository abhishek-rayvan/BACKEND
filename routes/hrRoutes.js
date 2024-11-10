const express = require("express");
const {
  manageAttendance,
  viewAttendance,
  calculateSalary,
  viewSalary,
} = require("../controllers/hrController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/attendance", verifyToken, authorizeRoles("HR"), manageAttendance);
router.get("/attendance", verifyToken, authorizeRoles("HR"), viewAttendance);
router.post("/salary", verifyToken, authorizeRoles("HR"), calculateSalary);
router.get("/salary", verifyToken, authorizeRoles("HR"), viewSalary);

module.exports = router;
