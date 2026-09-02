const express = require("express");

const { getFacilities } = require("../controllers/facilityController");

const router = express.Router();

router.get("/", getFacilities);

module.exports = router;