let unmetDemand = [];

function recordUnmetDemand({
  need,
  village,
  latitude,
  longitude,
  connectivity,
  language,
  reason
}) {
  const request = {
    id: `demand-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    need,
    village,
    latitude,
    longitude,
    connectivity,
    language,
    reason,
    createdAt: new Date().toISOString()
  };

  unmetDemand.push(request);

  return request;
}

function getUnmetDemand() {
  return unmetDemand;
}

function groupDemandByVillageAndNeed() {
  const groups = {};

  unmetDemand.forEach((request) => {
    const key = `${request.village}::${request.need}`;

    if (!groups[key]) {
      groups[key] = {
        village: request.village,
        need: request.need,
        requestCount: 0,
        latitude: request.latitude,
        longitude: request.longitude,
        poorConnectivityRequests: 0,
        moderateConnectivityRequests: 0,
        goodConnectivityRequests: 0,
        providerUnavailableRequests: 0
      };
    }

    const group = groups[key];

    group.requestCount += 1;

    if (request.connectivity === "poor") {
      group.poorConnectivityRequests += 1;
    }

    if (request.connectivity === "moderate") {
      group.moderateConnectivityRequests += 1;
    }

    if (request.connectivity === "good") {
      group.goodConnectivityRequests += 1;
    }

    if (
      request.reason &&
      (
        request.reason.toLowerCase().includes("no available provider") ||
        request.reason.toLowerCase().includes("no suitable provider")
      )
    ) {
      group.providerUnavailableRequests += 1;
    }
  });

  return Object.values(groups);
}

function determineAccessGap(item) {
  const {
    providerUnavailableRequests,
    requestCount,
    poorConnectivityRequests,
    goodConnectivityRequests
  } = item;

  if (
    providerUnavailableRequests >=
    Math.ceil(requestCount * 0.5)
  ) {
    return "specialist_unavailable";
  }

  if (
    poorConnectivityRequests >
    goodConnectivityRequests
  ) {
    return "connectivity_barrier";
  }

  return "care_access_gap";
}

function determineIntervention(item) {
  const {
    requestCount,
    poorConnectivityRequests,
    goodConnectivityRequests,
    providerUnavailableRequests
  } = item;

  const poorConnectivityRatio =
    requestCount === 0
      ? 0
      : poorConnectivityRequests / requestCount;

  const goodConnectivityRatio =
    requestCount === 0
      ? 0
      : goodConnectivityRequests / requestCount;

  const providerUnavailableRatio =
    requestCount === 0
      ? 0
      : providerUnavailableRequests / requestCount;

  if (
    providerUnavailableRatio >= 0.5 &&
    poorConnectivityRatio >= 0.5
  ) {
    return "mobile_outreach";
  }

  if (
    providerUnavailableRatio >= 0.5 &&
    goodConnectivityRatio >= 0.5
  ) {
    return "telemedicine";
  }

  if (requestCount >= 8) {
    return "provider_expansion";
  }

  if (
    requestCount >= 5 &&
    poorConnectivityRequests > goodConnectivityRequests
  ) {
    return "mobile_outreach";
  }

  if (requestCount >= 5) {
    return "telemedicine";
  }

  if (requestCount >= 3) {
    return "monitor_and_assess";
  }

  return "monitor_demand";
}

function determinePriority(item) {
  const {
    requestCount,
    poorConnectivityRequests,
    providerUnavailableRequests
  } = item;

  const poorConnectivityRatio =
    requestCount === 0
      ? 0
      : poorConnectivityRequests / requestCount;

  if (
    requestCount >= 8 ||
    (
      requestCount >= 5 &&
      poorConnectivityRatio >= 0.6
    )
  ) {
    return "high";
  }

  if (
    requestCount >= 3 ||
    providerUnavailableRequests >= 3
  ) {
    return "medium";
  }

  return "low";
}

function generateInterventionReason(item) {
  const {
    village,
    need,
    requestCount,
    recommendedIntervention
  } = item;

  const demandDescription =
    requestCount === 1
      ? `${need} demand was detected in ${village}`
      : `Repeated ${need} demand was detected in ${village}`;

  if (recommendedIntervention === "mobile_outreach") {
    return (
      `${demandDescription}, ` +
      `with significant access and connectivity barriers. ` +
      `Mobile healthcare outreach could bring the required service closer to the community.`
    );
  }

  if (recommendedIntervention === "telemedicine") {
    return (
      `${demandDescription}. ` +
      `Connectivity conditions indicate that telemedicine could reduce travel burden.`
    );
  }

  if (recommendedIntervention === "provider_expansion") {
    return (
      `${demandDescription} at a level that may justify ` +
      `expanding local healthcare provider capacity.`
    );
  }

  if (recommendedIntervention === "monitor_and_assess") {
    return (
      `${demandDescription}. ` +
      `The demand pattern should be monitored to determine whether further intervention is needed.`
    );
  }

  return (
    `${demandDescription}. ` +
    `Continue monitoring demand before making a larger healthcare intervention.`
  );
}

function generateInsights() {
  const groups = groupDemandByVillageAndNeed();

  return groups.map((item) => {
    const accessGap = determineAccessGap(item);
    const recommendedIntervention =
      determineIntervention(item);
    const priority = determinePriority(item);

    return {
      village: item.village,
      need: item.need,
      requestCount: item.requestCount,
      latitude: item.latitude,
      longitude: item.longitude,
      poorConnectivityRequests:
        item.poorConnectivityRequests,
      moderateConnectivityRequests:
        item.moderateConnectivityRequests,
      goodConnectivityRequests:
        item.goodConnectivityRequests,
      providerUnavailableRequests:
        item.providerUnavailableRequests,
      accessGap,
      priority,
      recommendedIntervention,
      recommendationReason:
        generateInterventionReason({
          ...item,
          recommendedIntervention
        })
    };
  });
}

function getPriorityGaps() {
  return generateInsights().filter(
    (insight) => insight.priority === "high"
  );
}

module.exports = {
  recordUnmetDemand,
  getUnmetDemand,
  groupDemandByVillageAndNeed,
  determineAccessGap,
  determineIntervention,
  determinePriority,
  generateInterventionReason,
  generateInsights,
  getDemandInsights: generateInsights,
  getPriorityGaps
};