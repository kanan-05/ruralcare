const express = require("express");

const { getProviders } = require("../controllers/providerController");

const router = express.Router();

router.get("/", getProviders);

module.exports = router;