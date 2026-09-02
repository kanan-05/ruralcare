const {
  recordUnmetDemand,
  getUnmetDemand
} = require("../services/demandService");

function createDemand(req, res) {
  try {
    const demand = recordUnmetDemand(req.body);

    res.status(201).json({
      message: "Unmet healthcare demand recorded",
      demand
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to record healthcare demand"
    });
  }
}

function getDemand(req, res) {
  try {
    const demand = getUnmetDemand();

    res.json({
      count: demand.length,
      requests: demand
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to retrieve healthcare demand"
    });
  }
}

module.exports = {
  createDemand,
  getDemand
};