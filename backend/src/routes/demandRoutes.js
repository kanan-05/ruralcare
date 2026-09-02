const express = require("express");

const {
  createDemand,
  getDemand
} = require("../controllers/demandController");

const router = express.Router();

router.post("/", createDemand);
router.get("/", getDemand);

module.exports = router;