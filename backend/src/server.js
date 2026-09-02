const express = require("express");
const cors = require("cors");

const { findBestCare } = require("./services/careAccessEngine");

const demandRoutes = require("./routes/demandRoutes");
const providerRoutes = require("./routes/providerRoutes");
const facilityRoutes = require("./routes/facilityRoutes");

const app = express();

app.use(cors());
app.use(express.json());


// ===============================
// API ROUTES
// ===============================

app.use("/api/demand", demandRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/facilities", facilityRoutes);


// ===============================
// HEALTH CHECK
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "RuralCare API is running 🚀"
  });
});


// ===============================
// CARE RECOMMENDATION
// ===============================

app.post("/api/care/recommend", (req, res) => {
  try {
    const result = findBestCare(req.body);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Unable to generate care recommendation"
    });
  }
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`RuralCare backend running on port ${PORT}`);
});