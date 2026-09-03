import { useState } from "react";
import { MapPin, Mic, ArrowRight } from "lucide-react";

import Results from "./pages/Results";
import Symptoms from "./pages/Symptoms";
import Emergency from "./pages/Emergency";
import Checkup from "./pages/Checkup";

import "./App.css";


function App() {

  const [language, setLanguage] = useState("English");

  const [need, setNeed] = useState("");

  const [location, setLocation] = useState(null);

  const [locationStatus, setLocationStatus] =
    useState("Not detected");

  const [showResults, setShowResults] =
    useState(false);

  const [showSymptoms, setShowSymptoms] =
    useState(false);

  const [symptomData, setSymptomData] =
    useState(null);

  const [showEmergency, setShowEmergency] =
    useState(false);

  const [showCheckup, setShowCheckup] =
    useState(false);

  const [checkupType, setCheckupType] =
    useState("");


  // =========================================
  // DETECT USER'S LOCATION
  // =========================================

  const detectLocation = () => {

    setLocationStatus("Detecting...");


    if (!navigator.geolocation) {

      setLocationStatus(
        "Location is not supported"
      );

      return;
    }


    navigator.geolocation.getCurrentPosition(

      (position) => {

        const {
          latitude,
          longitude
        } = position.coords;


        setLocation({
          latitude,
          longitude,
        });


        setLocationStatus(
          `Location detected (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`
        );

      },


      () => {

        setLocationStatus(
          "Unable to detect location"
        );

      }

    );

  };


  // =========================================
  // GO TO RESULTS PAGE
  // =========================================

  const handleStart = () => {

    if (!need) {

      alert(
        "Please select your healthcare need."
      );

      return;
    }


    if (!location) {

      alert(
        "Please detect your location."
      );

      return;
    }


    setShowResults(true);

  };


  // =========================================
  // EMERGENCY PAGE
  // =========================================

  if (showEmergency) {

    return (

      <Emergency
        onBack={() =>
          setShowEmergency(false)
        }
      />

    );

  }


  // =========================================
  // CHECK-UP PAGE
  // =========================================

  if (showCheckup) {

    return (

      <Checkup

        onBack={() =>
          setShowCheckup(false)
        }


        onContinue={(type) => {

          setCheckupType(type);

          setShowCheckup(false);

          setNeed("Check-up");

          setShowResults(true);

        }}

      />

    );

  }


  // =========================================
  // SYMPTOMS PAGE
  // =========================================

  if (showSymptoms) {

    return (

      <Symptoms

        onBack={() =>
          setShowSymptoms(false)
        }


        onContinue={(data) => {

          setSymptomData(data);


          if (
            data.severeBreathing === true
          ) {

            setShowSymptoms(false);

            setShowEmergency(true);

          } else {

            setShowSymptoms(false);

            setNeed("Symptoms");

            setShowResults(true);

          }

        }}

      />

    );

  }


  // =========================================
  // RESULTS PAGE
  // =========================================

  if (showResults) {

    return (

      <Results

        need={need}

        symptomData={symptomData}

        checkupType={checkupType}

        onBack={() =>
          setShowResults(false)
        }

      />

    );

  }


  // =========================================
  // HOMEPAGE
  // =========================================

  return (

    <div className="app">


      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header className="header">

        <div className="logo">

          <span className="logo-icon">
            ✚
          </span>

          <span>
            RuralCare
          </span>

        </div>


        <select

          value={language}

          onChange={(e) =>
            setLanguage(e.target.value)
          }

        >

          <option>
            English
          </option>

          <option>
            Hindi
          </option>

        </select>

      </header>



      {/* ================================= */}
      {/* MAIN CONTENT */}
      {/* ================================= */}

      <main className="main">


        {/* ================================= */}
        {/* HERO SECTION */}
        {/* ================================= */}

        <section className="hero">

          <p className="welcome">
            Welcome to RuralCare
          </p>


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



        {/* ================================= */}
        {/* CARE SELECTION CARD */}
        {/* ================================= */}

        <section className="care-card">

          <h2>
            What healthcare do you need?
          </h2>


          <p className="hint">

            Choose an option or tell us using your voice.

          </p>



          {/* ================================= */}
          {/* HEALTHCARE OPTIONS */}
          {/* ================================= */}

          <div className="need-options">


            {/* SYMPTOMS */}

            <button

              className={
                need === "Symptoms"
                  ? "selected"
                  : ""
              }

              onClick={() =>
                setShowSymptoms(true)
              }

            >

              🤒

              <span>
                I have symptoms
              </span>

            </button>



            {/* CHECK-UP */}

            <button

              className={
                need === "Check-up"
                  ? "selected"
                  : ""
              }

              onClick={() =>
                setShowCheckup(true)
              }

            >

              🩺

              <span>
                I need a check-up
              </span>

            </button>



            {/* ================================= */}
            {/* CHILDREN'S DOCTOR */}
            {/* ================================= */}

            <button

              className={
                need === "Children's Doctor"
                  ? "selected"
                  : ""
              }

              onClick={() =>
                setNeed("Children's Doctor")
              }

            >

              👶

              <span>
                Children's Doctor
              </span>

            </button>



            {/* ================================= */}
            {/* WOMEN'S HEALTH */}
            {/* ================================= */}

            <button

              className={
                need === "Women's Health"
                  ? "selected"
                  : ""
              }

              onClick={() =>
                setNeed("Women's Health")
              }

            >

              👩

              <span>
                Women's Health
              </span>

            </button>



            {/* ================================= */}
            {/* OTHER */}
            {/* ================================= */}

            <button

              className={
                need === "Other"
                  ? "selected"
                  : ""
              }

              onClick={() =>
                setNeed("Other")
              }

            >

              ➕

              <span>
                Other
              </span>

            </button>


          </div>



          {/* ================================= */}
          {/* VOICE BUTTON */}
          {/* ================================= */}

          <button className="voice-button">

            <Mic size={22} />

            Tell us what you need

          </button>



          {/* ================================= */}
          {/* LOCATION */}
          {/* ================================= */}

          <div className="location-box">

            <MapPin size={22} />


            <div>

              <strong>
                Your location
              </strong>


              <p>
                {locationStatus}
              </p>

            </div>


            <button

              className="location-button"

              onClick={detectLocation}

            >

              Detect

            </button>

          </div>



          {/* ================================= */}
          {/* FIND CARE BUTTON */}
          {/* ================================= */}

          <button

            className="continue-button"

            onClick={handleStart}

          >

            Find My Best Care

            <ArrowRight size={20} />

          </button>


        </section>



        {/* ================================= */}
        {/* HOW IT WORKS */}
        {/* ================================= */}

        <section className="how-section">

          <h2>
            How RuralCare works
          </h2>


          <div className="steps">


            {/* FIND */}

            <div className="step">

              <div>
                📍
              </div>

              <h3>
                Find
              </h3>

              <p>

                We understand your healthcare need
                and location.

              </p>

            </div>



            {/* MATCH */}

            <div className="step">

              <div>
                ⚙️
              </div>

              <h3>
                Match
              </h3>

              <p>

                We compare available care options.

              </p>

            </div>



            {/* CONNECT */}

            <div className="step">

              <div>
                ❤️
              </div>

              <h3>
                Connect
              </h3>

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