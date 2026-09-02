const express = require("express");

const {
  createEmergency
} = require("../controllers/emergencyController");

const router = express.Router();


// POST /api/emergency
router.post(
  "/",
  createEmergency
);


module.exports = router;