const express = require("express");

const {
  guidance
} = require("../controllers/aiController");

const router = express.Router();

router.post("/guidance", guidance);

module.exports = router;