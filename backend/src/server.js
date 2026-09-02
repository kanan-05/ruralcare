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

const emergencyRoutes =
  require("./routes/emergencyRoutes");


const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// API ROUTES
// ===============================

app.use(
  "/api/demand",
  demandRoutes
);

app.use(
  "/api/providers",
  providerRoutes
);

app.use(
  "/api/facilities",
  facilityRoutes
);

app.use(
  "/api/emergency",
  emergencyRoutes
);


// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {

  res.json({
    message:
      "RuralCare API is running 🚀"
  });

});


// ===============================
// CARE RECOMMENDATION
// ===============================

app.post(
  "/api/care/recommend",
  (req, res) => {

    try {

      const result =
        findBestCare(req.body);


      // ------------------------------------------------
      // Automatically record unmet demand
      // when suitable care cannot be accessed
      // ------------------------------------------------

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


      res.json(result);

    } catch (error) {

      console.error(error);

      res.status(500).json({

        error:
          "Unable to generate care recommendation"

      });

    }

  }
);


// ===============================
// START SERVER
// ===============================

const PORT =
  process.env.PORT || 5000;


app.listen(
  PORT,
  () => {

    console.log(
      `RuralCare backend running on port ${PORT}`
    );

  }
);