import { useState } from "react";

import {
  MapPin,
  Mic,
  ArrowRight,
} from "lucide-react";

import Results from "./pages/Results";
import Symptoms from "./pages/Symptoms";
import Emergency from "./pages/Emergency";
import Checkup from "./pages/Checkup";
import Dashboard from "./Dashboard";

import "./App.css";


function App() {

  /* =========================================
     LANGUAGE
  ========================================= */

  const [language, setLanguage] = useState("English");


  /* =========================================
     PATIENT STATE
  ========================================= */

  const [need, setNeed] = useState("");

  const [location, setLocation] = useState(null);

  const [locationStatus, setLocationStatus] =
    useState("");


  /* =========================================
     SCREEN STATE
  ========================================= */

  const [showDashboard, setShowDashboard] =
    useState(true);

  const [showResults, setShowResults] =
    useState(false);

  const [showSymptoms, setShowSymptoms] =
    useState(false);

  const [showEmergency, setShowEmergency] =
    useState(false);

  const [showCheckup, setShowCheckup] =
    useState(false);


  /* =========================================
     PATIENT DATA
  ========================================= */

  const [symptomData, setSymptomData] =
    useState(null);

  const [checkupType, setCheckupType] =
    useState("General Check-up");


  /* =========================================
     TRANSLATIONS
  ========================================= */

  const translations = {

    English: {
      welcome: "Healthcare that comes closer to you",
      subtitle:
        "Find the safest and most accessible way to get the care you need.",
      question: "What healthcare do you need?",
      symptoms: "I have symptoms",
      checkup: "I need a check-up",
      children: "Children's Doctor",
      women: "Women's Health",
      other: "Other",
      location: "Your location",
      detect: "Use my location",
      detected: "Location detected",
      find: "Find My Best Care",
      how: "How RuralCare works",
    },

    Hindi: {
      welcome: "स्वास्थ्य सेवा आपके करीब",
      subtitle:
        "अपनी जरूरत के अनुसार सबसे सुरक्षित और आसान स्वास्थ्य सेवा खोजें।",
      question: "आपको किस स्वास्थ्य सेवा की आवश्यकता है?",
      symptoms: "मुझे कुछ लक्षण हैं",
      checkup: "मुझे जांच करवानी है",
      children: "बच्चों के डॉक्टर",
      women: "महिला स्वास्थ्य",
      other: "अन्य",
      location: "आपका स्थान",
      detect: "मेरा स्थान उपयोग करें",
      detected: "स्थान मिल गया",
      find: "मेरे लिए सही देखभाल खोजें",
      how: "RuralCare कैसे काम करता है",
    },

    Tamil: {
      welcome: "சுகாதார சேவை உங்களுக்கு அருகில்",
      subtitle:
        "உங்களுக்கு தேவையான பாதுகாப்பான மற்றும் எளிதான சிகிச்சையை கண்டறியுங்கள்.",
      question: "உங்களுக்கு என்ன சுகாதார சேவை தேவை?",
      symptoms: "எனக்கு அறிகுறிகள் உள்ளன",
      checkup: "எனக்கு பரிசோதனை வேண்டும்",
      children: "குழந்தைகள் மருத்துவர்",
      women: "பெண்கள் நலம்",
      other: "மற்றவை",
      location: "உங்கள் இருப்பிடம்",
      detect: "எனது இருப்பிடத்தைப் பயன்படுத்தவும்",
      detected: "இருப்பிடம் கண்டறியப்பட்டது",
      find: "சிறந்த சிகிச்சையை கண்டறியவும்",
      how: "RuralCare எப்படி வேலை செய்கிறது",
    },

  };


  const t =
    translations[language] ||
    translations.English;


  /* =========================================
     LOCATION
  ========================================= */

  const detectLocation = () => {

    if (!navigator.geolocation) {

      setLocationStatus(
        "Location services are not supported on this device."
      );

      return;
    }


    setLocationStatus(
      "Detecting your location..."
    );


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };


        setLocation(coords);


        setLocationStatus(
          `${t.detected} ✓`
        );

      },

      () => {

        setLocationStatus(
          "Unable to detect location. Please allow location access."
        );

      }

    );

  };


  /* =========================================
     START CARE FLOW
  ========================================= */

  const handleStart = () => {

    if (!need) {

      alert(
        language === "Hindi"
          ? "कृपया अपनी स्वास्थ्य आवश्यकता चुनें।"
          : language === "Tamil"
          ? "உங்கள் சுகாதார தேவையைத் தேர்ந்தெடுக்கவும்."
          : "Please select what healthcare you need."
      );

      return;
    }


    if (
      location?.latitude == null ||
      location?.longitude == null
    ) {

      alert(
        language === "Hindi"
          ? "कृपया पहले अपना स्थान साझा करें।"
          : language === "Tamil"
          ? "தயவுசெய்து முதலில் உங்கள் இருப்பிடத்தைப் பகிரவும்."
          : "Please share your location first."
      );

      return;
    }


    /* -----------------------------------------
       SYMPTOM FLOW
    ----------------------------------------- */

    if (need === "Symptoms") {

      setShowSymptoms(true);

      setShowResults(false);
      setShowEmergency(false);
      setShowCheckup(false);

      return;
    }


    /* -----------------------------------------
       CHECK-UP FLOW
    ----------------------------------------- */

    if (need === "Check-up") {

      setShowCheckup(true);

      setShowSymptoms(false);
      setShowResults(false);
      setShowEmergency(false);

      return;
    }


    /* -----------------------------------------
       DIRECT CARE FLOW
    ----------------------------------------- */

    setShowResults(true);

    setShowSymptoms(false);
    setShowEmergency(false);
    setShowCheckup(false);

  };


  /* =========================================
     SYMPTOM CONTINUE
  ========================================= */

  const handleSymptomsContinue = (data) => {

    setSymptomData(data);


    /* -----------------------------------------
       EMERGENCY BRANCH
    ----------------------------------------- */

    if (data?.emergency === true) {

      console.log(
        "Emergency pathway triggered:",
        data
      );


      setShowSymptoms(false);

      setShowResults(false);

      setShowCheckup(false);

      setShowEmergency(true);

      return;
    }


    /* -----------------------------------------
       NORMAL CARE BRANCH
    ----------------------------------------- */

    setShowSymptoms(false);

    setShowEmergency(false);

    setShowResults(true);

  };


  /* =========================================
     CHECKUP CONTINUE
  ========================================= */

  const handleCheckupContinue = (type) => {

    setCheckupType(
      type || "General Check-up"
    );


    setShowCheckup(false);

    setShowEmergency(false);

    setShowResults(true);

  };


  /* =========================================
     RESET TO PATIENT HOME
  ========================================= */

  const resetPatientFlow = () => {

    setShowResults(false);

    setShowSymptoms(false);

    setShowEmergency(false);

    setShowCheckup(false);

    setSymptomData(null);

    setNeed("");

  };


  /* =========================================
     DASHBOARD
  ========================================= */

  if (showDashboard) {

    return (

      <Dashboard
        onStartPatient={() =>
          setShowDashboard(false)
        }
      />

    );

  }


  /* =========================================
     EMERGENCY SCREEN
  ========================================= */

  if (showEmergency) {

    return (

      <Emergency
        onBack={() => {

          setShowEmergency(false);

          setShowSymptoms(true);

        }}
      />

    );

  }


  /* =========================================
     SYMPTOMS SCREEN
  ========================================= */

  if (showSymptoms) {

    return (

      <Symptoms
        onBack={() => {

          setShowSymptoms(false);

        }}

        onContinue={
          handleSymptomsContinue
        }
      />

    );

  }


  /* =========================================
     CHECK-UP SCREEN
  ========================================= */

  if (showCheckup) {

    return (

      <Checkup
        onBack={() => {

          setShowCheckup(false);

        }}

        onContinue={
          handleCheckupContinue
        }
      />

    );

  }


  /* =========================================
     RESULTS SCREEN
  ========================================= */

  if (showResults) {

    return (

      <Results

        need={need}

        symptomData={symptomData}

        checkupType={checkupType}

        location={location}

        language={language}

        onBack={() => {

          setShowResults(false);

        }}

      />

    );

  }


  /* =========================================
     PATIENT HOME
  ========================================= */

  return (

    <div className="app">


      {/* =====================================
          HEADER
      ===================================== */}

      <header className="header">

        <div className="logo">

          <span className="logo-icon">
            ✚
          </span>

          <span>
            RuralCare
          </span>

        </div>


        <div className="header-actions">

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >

            <option value="English">
              English
            </option>

            <option value="Hindi">
              हिन्दी
            </option>

            <option value="Tamil">
              தமிழ்
            </option>

          </select>

        </div>

      </header>



      {/* =====================================
          MAIN
      ===================================== */}

      <main className="main">


        {/* HERO */}

        <section className="hero">

          <p className="welcome">
            {t.welcome}
          </p>


          <h1>
            Don't travel for care
            <br />
            <span>
              unless you need to.
            </span>
          </h1>


          <p className="subtitle">
            {t.subtitle}
          </p>


          {/* VOICE CONCEPT */}

          <button
            className="voice-button"
            type="button"
            onClick={() =>
              alert(
                "Voice input will be available in the next version."
              )
            }
          >

            <Mic size={20} />

            Tell RuralCare what you need

          </button>

        </section>



        {/* =====================================
            CARE CARD
        ===================================== */}

        <section className="care-card">

          <div className="card-heading">

            <h2>
              {t.question}
            </h2>

            <p>
              Choose one option to get started.
            </p>

          </div>


          <div className="need-options">


            {/* SYMPTOMS */}

            <button
              className={
                need === "Symptoms"
                  ? "need-option selected"
                  : "need-option"
              }

              onClick={() =>
                setNeed("Symptoms")
              }
            >

              <span className="need-emoji">
                🤒
              </span>

              <span>
                {t.symptoms}
              </span>

            </button>



            {/* CHECK-UP */}

            <button
              className={
                need === "Check-up"
                  ? "need-option selected"
                  : "need-option"
              }

              onClick={() =>
                setNeed("Check-up")
              }
            >

              <span className="need-emoji">
                🩺
              </span>

              <span>
                {t.checkup}
              </span>

            </button>



            {/* PEDIATRICS */}

            <button
              className={
                need === "Pediatrics"
                  ? "need-option selected"
                  : "need-option"
              }

              onClick={() =>
                setNeed("Pediatrics")
              }
            >

              <span className="need-emoji">
                👶
              </span>

              <span>
                {t.children}
              </span>

            </button>



            {/* WOMEN */}

            <button
              className={
                need === "Gynecology"
                  ? "need-option selected"
                  : "need-option"
              }

              onClick={() =>
                setNeed("Gynecology")
              }
            >

              <span className="need-emoji">
                👩
              </span>

              <span>
                {t.women}
              </span>

            </button>



            {/* OTHER */}

            <button
              className={
                need === "General Medicine"
                  ? "need-option selected"
                  : "need-option"
              }

              onClick={() =>
                setNeed("General Medicine")
              }
            >

              <span className="need-emoji">
                ➕
              </span>

              <span>
                {t.other}
              </span>

            </button>

          </div>



          {/* =================================
              LOCATION
          ================================= */}

          <div className="location-section">

            <div className="location-heading">

              <MapPin size={19} />

              <div>

                <strong>
                  {t.location}
                </strong>

                <span>
                  RuralCare uses your location
                  to estimate accessibility.
                </span>

              </div>

            </div>


            <button
              className="location-button"
              onClick={detectLocation}
            >

              <MapPin size={18} />

              {locationStatus ||
                t.detect}

            </button>

          </div>



          {/* =================================
              START
          ================================= */}

          <button
            className="start-button"
            onClick={handleStart}
          >

            <span>
              {t.find}
            </span>

            <ArrowRight size={20} />

          </button>


        </section>



        {/* =====================================
            HOW IT WORKS
        ===================================== */}

        <section className="how-it-works">

          <h2>
            {t.how}
          </h2>


          <div className="steps">

            <div className="step">

              <span>
                1
              </span>

              <div>

                <strong>
                  Tell us what you need
                </strong>

                <p>
                  Symptoms, check-up or another
                  healthcare need.
                </p>

              </div>

            </div>


            <div className="step">

              <span>
                2
              </span>

              <div>

                <strong>
                  We assess accessibility
                </strong>

                <p>
                  Location, availability and
                  connectivity are considered.
                </p>

              </div>

            </div>


            <div className="step">

              <span>
                3
              </span>

              <div>

                <strong>
                  Get the best care option
                </strong>

                <p>
                  Teleconsultation, nearby care
                  or urgent help.
                </p>

              </div>

            </div>

          </div>

        </section>


      </main>

    </div>

  );

}


export default App;