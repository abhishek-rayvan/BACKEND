const express = require("express");
const {
  addLabour,
  listLabours,
  updateLabour,
  trackLabourTime,
} = require("../controllers/salesManagerController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/labours", verifyToken, authorizeRoles("SalesManager"), addLabour);
router.get("/labours", verifyToken, authorizeRoles("SalesManager"), listLabours);
router.put("/labours/:id", verifyToken, authorizeRoles("SalesManager"), updateLabour);
router.get("/labours/:id/time", verifyToken, authorizeRoles("SalesManager"), trackLabourTime);

module.exports = router;
