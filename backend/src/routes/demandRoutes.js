const express = require("express");

const {
  createDemand,
  getDemand,
  getInsights
} = require("../controllers/demandController");

const router = express.Router();


// Record unmet healthcare demand
router.post("/", createDemand);


// Get all unmet requests
router.get("/", getDemand);


// Get aggregated healthcare insights
router.get("/insights", getInsights);


module.exports = router;