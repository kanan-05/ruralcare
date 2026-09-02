// --------------------------------------------------
// RuralCare Healthcare Intelligence Service
// --------------------------------------------------

// Temporary in-memory storage for unmet requests.
// Later this can be replaced with MongoDB.
const unmetRequests = [];


// --------------------------------------------------
// Record an unmet healthcare request
// --------------------------------------------------
function recordUnmetDemand(request = {}) {

  const demand = {

    id:
      `demand-${Date.now()}-${Math.floor(Math.random() * 1000)}`,

    need:
      request.need || "Unknown",

    village:
      request.village || "Unknown",

    latitude:
      request.latitude,

    longitude:
      request.longitude,

    connectivity:
      request.connectivity || "unknown",

    language:
      request.language || "English",

    reason:
      request.reason ||
      "No suitable care available",

    createdAt:
      new Date().toISOString()
  };


  unmetRequests.push(demand);


  return demand;
}


// --------------------------------------------------
// Get all unmet healthcare requests
// --------------------------------------------------
function getUnmetDemand() {

  return unmetRequests;
}


// --------------------------------------------------
// Determine the main healthcare access gap
// --------------------------------------------------
function determineAccessGap(item) {

  // Most/all requests are caused by
  // provider/specialist unavailability.
  if (
    item.providerUnavailableRequests >=
    Math.ceil(item.requestCount * 0.5)
  ) {

    return "specialist_unavailable";
  }


  // Poor connectivity is the dominant barrier.
  if (
    item.poorConnectivityRequests >
    item.goodConnectivityRequests
  ) {

    return "connectivity_barrier";
  }


  // General access problem.
  return "care_access_gap";
}


// --------------------------------------------------
// Determine recommended intervention
// --------------------------------------------------
function determineIntervention(item) {

  const {
    requestCount,
    poorConnectivityRequests,
    goodConnectivityRequests,
    providerUnavailableRequests
  } = item;


  // ------------------------------------------------
  // Case 1:
  // Provider unavailable + poor connectivity
  //
  // Healthcare should potentially come closer
  // to the community.
  // ------------------------------------------------
  if (
    providerUnavailableRequests >=
      Math.ceil(requestCount * 0.5) &&

    poorConnectivityRequests >=
      Math.ceil(requestCount * 0.5)
  ) {

    return "mobile_outreach";
  }


  // ------------------------------------------------
  // Case 2:
  // Provider unavailable + good connectivity
  //
  // Remote specialist access may be appropriate.
  // ------------------------------------------------
  if (
    providerUnavailableRequests >=
      Math.ceil(requestCount * 0.5) &&

    goodConnectivityRequests >=
      Math.ceil(requestCount * 0.5)
  ) {

    return "telemedicine";
  }


  // ------------------------------------------------
  // Case 3:
  // Very high repeated demand
  //
  // Persistent demand may justify increasing
  // local provider capacity.
  // ------------------------------------------------
  if (requestCount >= 8) {

    return "provider_expansion";
  }


  // ------------------------------------------------
  // Case 4:
  // Moderate repeated demand
  // ------------------------------------------------
  if (requestCount >= 5) {

    if (
      poorConnectivityRequests >
      goodConnectivityRequests
    ) {

      return "mobile_outreach";
    }

    return "telemedicine";
  }


  // ------------------------------------------------
  // Case 5:
  // Some repeated demand
  // ------------------------------------------------
  if (requestCount >= 3) {

    return "monitor_and_assess";
  }


  // ------------------------------------------------
  // Case 6:
  // Small amount of demand
  // ------------------------------------------------
  return "monitor_demand";
}


// --------------------------------------------------
// Determine priority of healthcare gap
// --------------------------------------------------
function determinePriority(
  requestCount,
  poorConnectivityRequests,
  providerUnavailableRequests
) {

  // ------------------------------------------------
  // High priority
  // ------------------------------------------------
  if (
    requestCount >= 8 ||

    (
      requestCount >= 5 &&
      poorConnectivityRequests >=
        Math.ceil(requestCount * 0.6)
    )
  ) {

    return "high";
  }


  // ------------------------------------------------
  // Medium priority
  // ------------------------------------------------
  if (
    requestCount >= 3 ||
    providerUnavailableRequests >= 3
  ) {

    return "medium";
  }


  // ------------------------------------------------
  // Low priority
  // ------------------------------------------------
  return "low";
}


// --------------------------------------------------
// Explain the recommended intervention
// --------------------------------------------------
function generateInterventionReason(item) {

  const {
    village,
    need,
    requestCount,
    recommendedIntervention
  } = item;


  // ------------------------------------------------
  // Mobile outreach
  // ------------------------------------------------
  if (
    recommendedIntervention ===
    "mobile_outreach"
  ) {

    return (
      `Repeated ${need} demand was detected in ${village}, ` +
      `with significant access and connectivity barriers. ` +
      `Mobile healthcare outreach could bring the required service closer to the community.`
    );
  }


  // ------------------------------------------------
  // Telemedicine
  // ------------------------------------------------
  if (
    recommendedIntervention ===
    "telemedicine"
  ) {

    return (
      `Repeated ${need} demand was detected in ${village}. ` +
      `Connectivity conditions indicate that telemedicine could reduce travel burden.`
    );
  }


  // ------------------------------------------------
  // Provider expansion
  // ------------------------------------------------
  if (
    recommendedIntervention ===
    "provider_expansion"
  ) {

    return (
      `${requestCount} unmet ${need} requests were detected in ${village}. ` +
      `Persistent demand suggests that additional local provider capacity may be needed.`
    );
  }


  // ------------------------------------------------
  // Monitor and assess
  // ------------------------------------------------
  if (
    recommendedIntervention ===
    "monitor_and_assess"
  ) {

    return (
      `Moderate unmet ${need} demand was detected in ${village}. ` +
      `The system recommends continued monitoring before a larger intervention.`
    );
  }


  // ------------------------------------------------
  // Monitor demand
  // ------------------------------------------------
  return (
    `Unmet ${need} demand has been detected in ${village}. ` +
    `More requests are needed before recommending a major intervention.`
  );
}


// --------------------------------------------------
// Group demand by village + healthcare need
// --------------------------------------------------
function getDemandInsights() {

  const groups = {};


  // ------------------------------------------------
  // Group every unmet request
  // ------------------------------------------------
  unmetRequests.forEach((request) => {

    const key =
      `${request.village}-${request.need}`;


    // ----------------------------------------------
    // Create group if it doesn't exist
    // ----------------------------------------------
    if (!groups[key]) {

      groups[key] = {

        village:
          request.village,

        need:
          request.need,

        requestCount:
          0,

        latitude:
          request.latitude,

        longitude:
          request.longitude,

        poorConnectivityRequests:
          0,

        moderateConnectivityRequests:
          0,

        goodConnectivityRequests:
          0,

        providerUnavailableRequests:
          0
      };
    }


    // ----------------------------------------------
    // Count request
    // ----------------------------------------------
    groups[key].requestCount += 1;


    // ----------------------------------------------
    // Count connectivity type
    // ----------------------------------------------
    if (
      request.connectivity === "poor"
    ) {

      groups[key]
        .poorConnectivityRequests += 1;
    }


    if (
      request.connectivity === "moderate"
    ) {

      groups[key]
        .moderateConnectivityRequests += 1;
    }


    if (
      request.connectivity === "good"
    ) {

      groups[key]
        .goodConnectivityRequests += 1;
    }


    // ----------------------------------------------
    // Detect provider unavailability
    // ----------------------------------------------
    if (
      request.reason &&
      (
        request.reason
          .toLowerCase()
          .includes(
            "no available provider"
          ) ||

        request.reason
          .toLowerCase()
          .includes(
            "no suitable provider"
          )
      )
    ) {

      groups[key]
        .providerUnavailableRequests += 1;
    }

  });


  // ------------------------------------------------
  // Convert grouped object to array
  // ------------------------------------------------
  const insights =
    Object.values(groups);


  // ------------------------------------------------
  // Generate intelligence for each group
  // ------------------------------------------------
  return insights.map((item) => {

    const accessGap =
      determineAccessGap(item);


    const recommendedIntervention =
      determineIntervention(item);


    const priority =
      determinePriority(

        item.requestCount,

        item.poorConnectivityRequests,

        item.providerUnavailableRequests
      );


    const recommendationReason =
      generateInterventionReason({

        ...item,

        recommendedIntervention
      });


    return {

      ...item,

      accessGap,

      priority,

      recommendedIntervention,

      recommendationReason
    };
  });
}


// --------------------------------------------------
// Get only high-priority healthcare gaps
// --------------------------------------------------
function getPriorityGaps() {

  return getDemandInsights()
    .filter(
      (item) =>
        item.priority === "high"
    );
}


// --------------------------------------------------
// Export service functions
// --------------------------------------------------
module.exports = {

  recordUnmetDemand,

  getUnmetDemand,

  getDemandInsights,

  getPriorityGaps
};