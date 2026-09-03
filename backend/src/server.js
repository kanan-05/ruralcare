const express = require("express");
const cors = require("cors");

const { findBestCare } =
  require("./services/careAccessEngine");

const {
  recordUnmetDemand
} = require("./services/demandService");

const demandRoutes =
  require("./routes/demandRoutes");

const providerRoutes =
  require("./routes/providerRoutes");

const facilityRoutes =
  require("./routes/facilityRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// API ROUTES
// ===============================

app.use("/api/demand", demandRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/ai", aiRoutes);


// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "RuralCare API is running"
  });
});


// ===============================
// CARE RECOMMENDATION
// ===============================

app.post("/api/care/recommend", (req, res) => {

  try {

    console.log("\n==============================");
    console.log("CARE REQUEST RECEIVED");
    console.log("==============================");

    console.log(
      "Need:",
      req.body.need
    );

    console.log(
      "Location:",
      req.body.latitude,
      ",",
      req.body.longitude
    );

    console.log(
      "Connectivity:",
      req.body.connectivity
    );

    console.log(
      "Language:",
      req.body.language
    );


    // Run care access engine
    const result =
      findBestCare(req.body);


    console.log("------------------------------");

    console.log(
      "Recommendation:",
      result.recommendation
    );


    if (result.bestOption) {

      console.log(
        "Provider:",
        result.bestOption.provider
      );

      console.log(
        "Facility:",
        result.bestOption.facility
      );

      console.log(
        "Distance:",
        result.bestOption.distance,
        "km"
      );

      console.log(
        "Score:",
        result.bestOption.score
      );

    }


    console.log("==============================\n");


    // Record unmet demand
    if (
      result.recommendation ===
      "mobile_outreach"
    ) {

      recordUnmetDemand({

        need:
          req.body.need,

        village:
          req.body.village,

        latitude:
          req.body.latitude,

        longitude:
          req.body.longitude,

        connectivity:
          req.body.connectivity,

        language:
          req.body.language,

        reason:
          result.message

      });

    }


    // Send result to frontend
    res.json(result);


  } catch (error) {

    console.error(
      "CARE ENGINE ERROR:",
      error
    );

    res.status(500).json({

      error:
        "Unable to generate care recommendation"

    });

  }

});


// ===============================
// START SERVER
// ===============================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `RuralCare backend running on port ${PORT}`
  );

});