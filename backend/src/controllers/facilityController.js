const facilities = require("../data/facilities.json");

function getFacilities(req, res) {
  res.json({
    count: facilities.length,
    facilities
  });
}

module.exports = {
  getFacilities
};