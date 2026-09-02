const unmetRequests = [];

function recordUnmetDemand(request) {
  const demand = {
    id: `demand-${Date.now()}`,
    need: request.need,
    village: request.village,
    latitude: request.latitude,
    longitude: request.longitude,
    connectivity: request.connectivity || "unknown",
    createdAt: new Date().toISOString()
  };

  unmetRequests.push(demand);

  return demand;
}

function getUnmetDemand() {
  return unmetRequests;
}

module.exports = {
  recordUnmetDemand,
  getUnmetDemand
};