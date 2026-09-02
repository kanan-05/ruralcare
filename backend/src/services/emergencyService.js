const facilities = require("../data/facilities.json");


// --------------------------------------------------
// Calculate distance using Haversine formula
// --------------------------------------------------
function calculateDistance(lat1, lon1, lat2, lon2) {

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
// Estimate emergency travel time
// Demo assumption: 40 km/h
// --------------------------------------------------
function estimateEmergencyTravelTime(distance) {

  const averageSpeed = 40;

  const timeInHours =
    distance / averageSpeed;

  return Math.max(
    1,
    Math.round(timeInHours * 60)
  );
}


// --------------------------------------------------
// Find nearest emergency facility
// --------------------------------------------------
function findNearestEmergencyFacility(
  latitude,
  longitude
) {

  const emergencyFacilities =
    facilities.filter(
      (facility) =>
        facility.emergency === true
    );


  if (
    emergencyFacilities.length === 0
  ) {

    return null;
  }


  const options =
    emergencyFacilities.map(
      (facility) => {

        const distance =
          calculateDistance(
            latitude,
            longitude,
            facility.latitude,
            facility.longitude
          );

        return {

          facility:
            facility.name,

          facilityId:
            facility.id,

          facilityType:
            facility.type,

          latitude:
            facility.latitude,

          longitude:
            facility.longitude,

          distance:
            Number(
              distance.toFixed(2)
            ),

          estimatedTravelTime:
            estimateEmergencyTravelTime(
              distance
            )
        };
      }
    );


  options.sort(
    (a, b) =>
      a.distance - b.distance
  );


  return options[0];
}


// --------------------------------------------------
// Create emergency response
// --------------------------------------------------
function handleEmergency(request = {}) {

  const {
    latitude,
    longitude,
    language = "English",
    emergencyContact
  } = request;


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

      success: false,

      recommendation:
        "location_required",

      message:
        "A valid patient location is required for emergency assistance.",

      nearestFacility: null,

      instructions: [
        "Move to a safe location if possible.",
        "Contact your local emergency service.",
        "Ask a nearby person or health worker for immediate assistance."
      ]
    };
  }


  // ------------------------------------------------
  // Find nearest emergency facility
  // ------------------------------------------------
  const nearestFacility =
    findNearestEmergencyFacility(
      latitude,
      longitude
    );


  if (!nearestFacility) {

    return {

      success: false,

      recommendation:
        "emergency_service_required",

      message:
        "No configured emergency facility was found.",

      nearestFacility: null,

      instructions: [
        "Contact your local emergency service immediately.",
        "Ask a nearby health worker or trusted person for assistance."
      ]
    };
  }


  // ------------------------------------------------
  // Emergency instructions
  // ------------------------------------------------
  const instructions = [

    "Seek emergency medical help immediately.",

    `Nearest configured emergency facility is ${nearestFacility.facility}.`,

    `Estimated travel time is about ${nearestFacility.estimatedTravelTime} minutes.`,

    "If possible, share your location with a trusted person or emergency responder.",

    "Do not delay emergency care while using the application."
  ];


  // ------------------------------------------------
  // Return emergency response
  // ------------------------------------------------
  return {

    success: true,

    recommendation:
      "emergency_care",

    message:
      "Emergency care should be sought immediately.",

    language,

    patientLocation: {

      latitude,

      longitude
    },

    nearestFacility,

    emergencyContact:
      emergencyContact || null,

    instructions
  };
}


// --------------------------------------------------
// Export
// --------------------------------------------------
module.exports = {

  calculateDistance,

  estimateEmergencyTravelTime,

  findNearestEmergencyFacility,

  handleEmergency
};