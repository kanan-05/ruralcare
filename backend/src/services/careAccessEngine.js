const providers = require("../data/providers.json");
const facilities = require("../data/facilities.json");


// --------------------------------------------------
// Patient-friendly healthcare names
// → Backend specialty names
// --------------------------------------------------
const NEED_MAP = {
  "General Doctor": "General Medicine",
  "Women's Health": "Gynecology",
  "Children's Doctor": "Pediatrics",
  "Heart Care": "Cardiology"
};


// --------------------------------------------------
// Allowed connectivity values
// --------------------------------------------------
const VALID_CONNECTIVITY = [
  "good",
  "moderate",
  "poor"
];


// --------------------------------------------------
// Normalize healthcare need
// --------------------------------------------------
function normalizeNeed(need) {

  if (!need || typeof need !== "string") {
    return null;
  }

  const cleanedNeed = need.trim();

  return NEED_MAP[cleanedNeed] || cleanedNeed;
}


// --------------------------------------------------
// Calculate approximate distance
// Uses Haversine formula
// --------------------------------------------------
function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2
) {

  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +

    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *

    Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}


// --------------------------------------------------
// Estimate rural travel time
// Demo assumption: 30 km/h
// --------------------------------------------------
function estimateTravelTime(distance) {

  const averageSpeed = 30;

  const timeInHours =
    distance / averageSpeed;

  const timeInMinutes =
    timeInHours * 60;

  return Math.max(
    1,
    Math.round(timeInMinutes)
  );
}


// --------------------------------------------------
// Calculate individual score components
// --------------------------------------------------

// Travel score: 40 points
function calculateTravelScore(distance) {

  if (distance <= 2) {
    return 40;
  }

  if (distance <= 5) {
    return 38;
  }

  if (distance <= 10) {
    return 34;
  }

  if (distance <= 15) {
    return 28;
  }

  if (distance <= 20) {
    return 20;
  }

  if (distance <= 30) {
    return 10;
  }

  return 0;
}


// Provider availability: 20 points
function calculateAvailabilityScore(provider) {

  if (provider.available) {
    return 20;
  }

  return 0;
}


// Language accessibility: 15 points
function calculateLanguageScore(
  provider,
  language
) {

  if (
    !provider.languages ||
    !language
  ) {
    return 0;
  }

  const supported =
    provider.languages.some(
      (providerLanguage) =>
        providerLanguage.toLowerCase() ===
        language.toLowerCase()
    );

  return supported ? 15 : 0;
}


// Connectivity suitability: 15 points
function calculateConnectivityScore(
  provider,
  connectivity
) {

  // Good connectivity
  if (connectivity === "good") {

    if (provider.telemedicine) {
      return 15;
    }

    return 10;
  }


  // Moderate connectivity
  if (connectivity === "moderate") {

    if (provider.telemedicine) {
      return 12;
    }

    return 10;
  }


  // Poor connectivity
  if (connectivity === "poor") {

    // Telemedicine is less useful
    // when connectivity is poor.
    if (provider.telemedicine) {
      return 6;
    }

    // In-person care remains possible.
    return 12;
  }


  return 0;
}


// Telemedicine availability: 10 points
function calculateTelemedicineScore(
  provider,
  connectivity
) {

  if (!provider.telemedicine) {
    return 0;
  }

  // Poor connectivity limits usefulness.
  if (connectivity === "poor") {
    return 4;
  }

  return 10;
}


// --------------------------------------------------
// Generate explanation
// --------------------------------------------------
function generateReasons(
  bestOption,
  language,
  connectivity,
  recommendation
) {

  const reasons = [];


  // Distance
  if (bestOption.distance <= 5) {

    reasons.push(
      `The facility is only ${bestOption.distance} km away.`
    );

  } else if (bestOption.distance <= 15) {

    reasons.push(
      `The facility is ${bestOption.distance} km away.`
    );

  } else {

    reasons.push(
      `The facility is ${bestOption.distance} km away, creating a higher travel burden.`
    );
  }


  // Travel time
  const timeUnit =
    bestOption.estimatedTravelTime === 1
      ? "minute"
      : "minutes";

  reasons.push(
    `Estimated travel time is about ${bestOption.estimatedTravelTime} ${timeUnit}.`
  );


  // Language
  if (bestOption.languageSupported) {

    reasons.push(
      `The provider supports ${language}.`
    );

  } else {

    reasons.push(
      `The provider does not list ${language}, so language assistance may be needed.`
    );
  }


  // Connectivity
  if (connectivity === "good") {

    reasons.push(
      "Connectivity is suitable for digital healthcare services."
    );

  } else if (connectivity === "moderate") {

    reasons.push(
      "Moderate connectivity may affect video consultations."
    );

  } else {

    reasons.push(
      "Poor connectivity makes in-person care more suitable than video consultation."
    );
  }


  // Telemedicine
  if (bestOption.telemedicine) {

    if (connectivity === "good") {

      reasons.push(
        "Telemedicine is available and can reduce travel."
      );

    } else if (connectivity === "moderate") {

      reasons.push(
        "Telemedicine is available, but network quality may affect the experience."
      );

    } else {

      reasons.push(
        "Telemedicine is available, but poor connectivity reduces its usefulness."
      );
    }
  }


  // Recommendation
  if (recommendation === "local") {

    reasons.push(
      "Local care provides the lowest access burden for this request."
    );
  }


  if (recommendation === "telemedicine") {

    reasons.push(
      "Telemedicine can significantly reduce the patient's travel burden."
    );
  }


  if (recommendation === "mobile_outreach") {

    reasons.push(
      "Current access conditions suggest that healthcare should be brought closer to the community."
    );
  }


  return reasons;
}


// --------------------------------------------------
// Find best healthcare option
// --------------------------------------------------
function findBestCare(options) {

  options = options || {};


  const {
    need,
    latitude,
    longitude,
    connectivity = "good",
    language = "English"
  } = options;


  // ------------------------------------------------
  // Normalize healthcare need
  // ------------------------------------------------
  const normalizedNeed =
    normalizeNeed(need);


  // ------------------------------------------------
  // Validate healthcare need
  // ------------------------------------------------
  if (!normalizedNeed) {

    return {

      recommendation:
        "invalid_request",

      message:
        "Please specify the type of healthcare you need.",

      accessScore: 0,

      bestOption: null,

      alternatives: [],

      reasons: [
        "A healthcare need is required."
      ]
    };
  }


  // ------------------------------------------------
  // Validate location
  // ------------------------------------------------
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {

    return {

      recommendation:
        "location_required",

      message:
        "A valid patient location is required to find accessible care.",

      accessScore: 0,

      bestOption: null,

      alternatives: [],

      reasons: [
        "A valid patient location is required."
      ]
    };
  }


  // ------------------------------------------------
  // Validate connectivity
  // ------------------------------------------------
  if (
    !VALID_CONNECTIVITY.includes(
      connectivity
    )
  ) {

    return {

      recommendation:
        "invalid_request",

      message:
        "Invalid connectivity information.",

      accessScore: 0,

      bestOption: null,

      alternatives: [],

      reasons: [
        "Connectivity must be good, moderate, or poor."
      ]
    };
  }


  // ------------------------------------------------
  // Find available providers
  // ------------------------------------------------
  const matchingProviders =
    providers.filter(
      (provider) =>
        provider.specialization
          .toLowerCase() ===
          normalizedNeed.toLowerCase() &&
        provider.available
    );


  // ------------------------------------------------
  // No provider available
  // ------------------------------------------------
  if (
    matchingProviders.length === 0
  ) {

    return {

      recommendation:
        "mobile_outreach",

      accessScore: 0,

      bestOption: null,

      alternatives: [],

      reasons: [

        `No available provider was found for ${normalizedNeed}.`,

        "The system recommends considering mobile healthcare outreach.",

        "This unmet demand can also be recorded for healthcare planning."
      ],

      message:
        "No suitable provider is currently available. Consider mobile healthcare outreach."
    };
  }


  // ------------------------------------------------
  // Build care options
  // ------------------------------------------------
  const careOptions =
    matchingProviders

      .map((provider) => {

        // Find facility
        const facility =
          facilities.find(
            (facility) =>
              facility.id ===
              provider.facilityId
          );


        if (!facility) {
          return null;
        }


        // ------------------------------------------
        // Distance
        // ------------------------------------------
        const distance =
          calculateDistance(

            latitude,
            longitude,

            facility.latitude,
            facility.longitude
          );


        // ------------------------------------------
        // Travel time
        // ------------------------------------------
        const estimatedTravelTime =
          estimateTravelTime(
            distance
          );


        // ------------------------------------------
        // Score components
        // ------------------------------------------
        const travelScore =
          calculateTravelScore(
            distance
          );


        const availabilityScore =
          calculateAvailabilityScore(
            provider
          );


        const languageScore =
          calculateLanguageScore(
            provider,
            language
          );


        const connectivityScore =
          calculateConnectivityScore(
            provider,
            connectivity
          );


        const telemedicineScore =
          calculateTelemedicineScore(
            provider,
            connectivity
          );


        // ------------------------------------------
        // Final score
        // ------------------------------------------
        const score =
          travelScore +
          availabilityScore +
          languageScore +
          connectivityScore +
          telemedicineScore;


        // ------------------------------------------
        // Language support
        // ------------------------------------------
        const languageSupported =
          languageScore > 0;


        // ------------------------------------------
        // Return option
        // ------------------------------------------
        return {

          provider:
            provider.name,

          specialization:
            provider.specialization,

          facility:
            facility.name,

          facilityType:
            facility.type,

          languages:
            provider.languages || [],

          languageSupported,

          distance:
            Number(
              distance.toFixed(2)
            ),

          estimatedTravelTime,

          telemedicine:
            provider.telemedicine,

          emergency:
            facility.emergency,

          score:
            Number(
              score.toFixed(2)
            ),

          scoreBreakdown: {

            travel:
              travelScore,

            availability:
              availabilityScore,

            language:
              languageScore,

            connectivity:
              connectivityScore,

            telemedicine:
              telemedicineScore
          }
        };
      })

      .filter(Boolean);


  // ------------------------------------------------
  // Sort by Access Score
  // ------------------------------------------------
  careOptions.sort(
    (a, b) =>
      b.score - a.score
  );


  // ------------------------------------------------
  // Best option
  // ------------------------------------------------
  const bestOption =
    careOptions[0];


  // ------------------------------------------------
  // Decide care pathway
  // ------------------------------------------------
  let recommendation =
    "local";


  // -----------------------------------------------
  // Far provider + telemedicine + usable network
  // -----------------------------------------------
  if (

    bestOption.distance > 15 &&

    bestOption.telemedicine &&

    connectivity !== "poor"

  ) {

    recommendation =
      "telemedicine";
  }


  // -----------------------------------------------
  // Very poor accessibility
  // -----------------------------------------------
  if (

    bestOption.score < 40 &&

    bestOption.distance > 20

  ) {

    recommendation =
      "mobile_outreach";
  }


  // ------------------------------------------------
  // Generate explanation
  // ------------------------------------------------
  const reasons =
    generateReasons(

      bestOption,

      language,

      connectivity,

      recommendation
    );


  // ------------------------------------------------
  // Return result
  // ------------------------------------------------
  return {

    recommendation,

    accessScore:
      bestOption.score,

    bestOption,

    alternatives:
      careOptions.slice(1),

    reasons,

    message:
      `Recommended ${recommendation} care based on specialty, availability, distance, language, connectivity and telemedicine access.`
  };
}


// --------------------------------------------------
// Export functions
// --------------------------------------------------
module.exports = {

  calculateDistance,

  estimateTravelTime,

  normalizeNeed,

  findBestCare
};