const express = require("express");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createSalesManager,
  listSalesManagers,
  updateSalesManager,
  deleteSalesManager,
  getSalesManagerLocation,
  createLabour,
  listLabours,
  updateLabour,
  deleteLabour,
} = require("../controllers/adminController");

router.post(
  "/sales-managers",
  verifyToken,
  authorizeRoles("Admin"),
  createSalesManager
);
router.get(
  "/sales-managers",
  verifyToken,
  authorizeRoles("Admin"),
  listSalesManagers
);
router.put(
  "/sales-managers/:id",
  verifyToken,
  authorizeRoles("Admin"),
  updateSalesManager
);
router.delete(
  "/sales-managers/:id",
  verifyToken,
  authorizeRoles("Admin"),
  deleteSalesManager
);
router.get(
  "/sales-managers/:id/location",
  verifyToken,
  authorizeRoles("Admin"),
  getSalesManagerLocation
);

router.post("/labours", verifyToken, authorizeRoles("Admin"), createLabour);
router.get("/labours", verifyToken, authorizeRoles("Admin"), listLabours);
router.put("/labours/:id", verifyToken, authorizeRoles("Admin"), updateLabour);
router.delete(
  "/labours/:id",
  verifyToken,
  authorizeRoles("Admin"),
  deleteLabour
);

module.exports = router;
