const providers = require("../data/providers.json");
const facilities = require("../data/facilities.json");

// Calculate approximate distance between two coordinates
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}


// Find the best healthcare option
function findBestCare(options) {
  const {
    need,
    latitude,
    longitude,
    connectivity = "good"
  } = options;

  // Find providers matching the required specialty
  const matchingProviders = providers.filter(
    (provider) =>
      provider.specialization.toLowerCase() === need.toLowerCase() &&
      provider.available
  );

  // No matching provider available
  if (matchingProviders.length === 0) {
    return {
      recommendation: "mobile_outreach",
      message:
        "No suitable nearby provider is currently available. Consider mobile healthcare outreach.",
      score: 0
    };
  }

  // Build possible care options
  const careOptions = matchingProviders.map((provider) => {
    const facility = facilities.find(
      (facility) => facility.id === provider.facilityId
    );

    if (!facility) {
      return null;
    }

    const distance = calculateDistance(
      latitude,
      longitude,
      facility.latitude,
      facility.longitude
    );

    let score = 100;

    // Travel burden
    score -= Math.min(distance * 2, 40);

    // Connectivity affects telemedicine
    if (connectivity === "poor" && provider.telemedicine) {
      score -= 10;
    }

    return {
      provider: provider.name,
      specialization: provider.specialization,
      facility: facility.name,
      facilityType: facility.type,
      distance: Number(distance.toFixed(2)),
      telemedicine: provider.telemedicine,
      emergency: facility.emergency,
      score: Number(Math.max(score, 0).toFixed(2))
    };
  }).filter(Boolean);

  // Sort highest score first
  careOptions.sort((a, b) => b.score - a.score);

  const bestOption = careOptions[0];

  // Decide the care pathway
  let recommendation = "local";

  if (
    connectivity !== "poor" &&
    bestOption.telemedicine &&
    bestOption.distance > 15
  ) {
    recommendation = "telemedicine";
  }

  return {
    recommendation,
    bestOption,
    alternatives: careOptions.slice(1),
    message: `Recommended ${recommendation} care based on specialty, availability, distance and connectivity.`
  };
}

module.exports = {
  calculateDistance,
  findBestCare
};