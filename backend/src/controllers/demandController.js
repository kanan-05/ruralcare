const {
  recordUnmetDemand,
  getUnmetDemand,
  getDemandInsights
} = require("../services/demandService");


// --------------------------------------------------
// Create unmet demand
// --------------------------------------------------
function createDemand(req, res) {
  try {

    const demand =
      recordUnmetDemand(req.body);


    res.status(201).json({
      message:
        "Unmet healthcare demand recorded",

      demand
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Unable to record healthcare demand"
    });
  }
}


// --------------------------------------------------
// Get all unmet requests
// --------------------------------------------------
function getDemand(req, res) {
  try {

    const demand =
      getUnmetDemand();


    res.json({
      count: demand.length,

      requests: demand
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Unable to retrieve healthcare demand"
    });
  }
}


// --------------------------------------------------
// Get healthcare intelligence
// --------------------------------------------------
function getInsights(req, res) {
  try {

    const insights =
      getDemandInsights();


    res.json({
      count: insights.length,

      insights
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Unable to generate healthcare insights"
    });
  }
}


module.exports = {
  createDemand,
  getDemand,
  getInsights
};