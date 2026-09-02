const providers = require("../data/providers.json");

function getProviders(req, res) {
  res.json({
    count: providers.length,
    providers
  });
}

module.exports = {
  getProviders
};