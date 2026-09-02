import { useState } from "react";
import { MapPin, Mic, ArrowRight } from "lucide-react";
import Results from "./pages/Results";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("English");
  const [need, setNeed] = useState("");
  const [location, setLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("Not detected");
  const [showResults, setShowResults] = useState(false);

  // Detect user's location
  const detectLocation = () => {
    setLocationStatus("Detecting...");

    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({
          latitude,
          longitude,
        });

        setLocationStatus(
          `Location detected (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        );
      },
      () => {
        setLocationStatus("Unable to detect location");
      }
    );
  };

  // Go to results page
  const handleStart = () => {
    if (!need) {
      alert("Please select your healthcare need.");
      return;
    }

    if (!location) {
      alert("Please detect your location.");
      return;
    }

    setShowResults(true);
  };

  // Show Results page
  if (showResults) {
    return (
      <Results
        need={need}
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">✚</span>
          <span>RuralCare</span>
        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
      </header>

      {/* MAIN CONTENT */}
      <main className="main">

        {/* HERO SECTION */}
        <section className="hero">
          <p className="welcome">Welcome to RuralCare</p>

          <h1>
            Get the right healthcare,
            <br />
            closer to you.
          </h1>

          <p className="subtitle">
            We help you find the most accessible healthcare option
            based on your location, need and available services.
          </p>
        </section>

        {/* CARE SELECTION CARD */}
        <section className="care-card">
          <h2>What healthcare do you need?</h2>

          <p className="hint">
            Choose an option or tell us using your voice.
          </p>

          {/* HEALTHCARE OPTIONS */}
          <div className="need-options">

            <button
              className={
                need === "General Doctor" ? "selected" : ""
              }
              onClick={() => setNeed("General Doctor")}
            >
              🩺
              <span>General Doctor</span>
            </button>

            <button
              className={
                need === "Pediatrics" ? "selected" : ""
              }
              onClick={() => setNeed("Pediatrics")}
            >
              👶
              <span>Children's Doctor</span>
            </button>

            <button
              className={
                need === "Women's Health" ? "selected" : ""
              }
              onClick={() => setNeed("Women's Health")}
            >
              👩
              <span>Women's Health</span>
            </button>

            <button
              className={
                need === "Other" ? "selected" : ""
              }
              onClick={() => setNeed("Other")}
            >
              ➕
              <span>Other</span>
            </button>

          </div>

          {/* VOICE BUTTON */}
          <button className="voice-button">
            <Mic size={22} />
            Tell us what you need
          </button>

          {/* LOCATION */}
          <div className="location-box">
            <MapPin size={22} />

            <div>
              <strong>Your location</strong>

              <p>{locationStatus}</p>
            </div>

            <button
              className="location-button"
              onClick={detectLocation}
            >
              Detect
            </button>
          </div>

          {/* FIND CARE BUTTON */}
          <button
            className="continue-button"
            onClick={handleStart}
          >
            Find My Best Care
            <ArrowRight size={20} />
          </button>

        </section>

        {/* HOW IT WORKS */}
        <section className="how-section">
          <h2>How RuralCare works</h2>

          <div className="steps">

            <div className="step">
              <div>📍</div>

              <h3>Find</h3>

              <p>
                We understand your healthcare need and location.
              </p>
            </div>

            <div className="step">
              <div>⚙️</div>

              <h3>Match</h3>

              <p>
                We compare available care options.
              </p>
            </div>

            <div className="step">
              <div>❤️</div>

              <h3>Connect</h3>

              <p>
                We guide you to the most accessible care.
              </p>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default App;