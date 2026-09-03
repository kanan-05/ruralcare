import { useEffect, useState } from "react";

import {
  ArrowLeft,
  MapPin,
  Video,
  Ambulance,
  Clock,
  CheckCircle,
  Brain,
  Navigation,
  Phone,
  ChevronRight,
  Stethoscope,
  Wifi,
  ShieldCheck,
} from "lucide-react";

import CareDetails from "./CareDetails";
import Transport from "./Transport";

import "../App.css";
import "./Results.css";


function Results({
  need,
  symptomData,
  checkupType,
  location,
  language,
  onBack,
}) {

  const [detailsType, setDetailsType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [careResult, setCareResult] = useState(null);


  // =====================================================
  // CALL RURALCARE CARE ENGINE
  // =====================================================

  useEffect(() => {

    const getRecommendation = async () => {

      try {

        setLoading(true);
        setError("");

        let backendNeed = "General Medicine";

        if (need === "Children's Doctor") {
          backendNeed = "Pediatrics";
        }

        else if (need === "Women's Health") {
          backendNeed = "Gynecology";
        }

        else if (need === "Symptoms") {
          backendNeed = "General Medicine";
        }

        else if (need === "Check-up") {
          backendNeed = "General Medicine";
        }

        else if (need === "Other") {
          backendNeed = "General Medicine";
        }


        const connectivity = "good";


        const response = await fetch(
          "http://localhost:5000/api/care/recommend",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({

              need: backendNeed,

              latitude: location?.latitude,

              longitude: location?.longitude,

              connectivity,

              language,

            }),
          }
        );


        if (!response.ok) {

          throw new Error(
            "Unable to get care recommendation"
          );

        }


        const data = await response.json();


        console.log(
          "RuralCare backend response:",
          data
        );


        setCareResult(data);

      }


      catch (err) {

        console.error(err);

        setError(
          "We couldn't connect to the RuralCare care engine."
        );

      }


      finally {

        setLoading(false);

      }

    };


    if (
      location?.latitude != null &&
      location?.longitude != null
    ) {

      getRecommendation();

    }

    else {

      setError(
        "Your location is required to find the most accessible care."
      );

      setLoading(false);

    }

  }, [need, location, language]);


  // =====================================================
  // DETAILS
  // =====================================================

  if (detailsType === "transport") {

    return (
      <Transport
        onBack={() => setDetailsType(null)}
      />
    );

  }


  if (detailsType) {

    return (
      <CareDetails
        type={detailsType}
        onBack={() => setDetailsType(null)}
      />
    );

  }


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="results-shell">

        <header className="results-header">

          <div className="results-logo">

            <span className="results-logo-icon">
              ✚
            </span>

            <span>
              RuralCare
            </span>

          </div>

        </header>


        <main className="results-main">

          <div className="results-loading">

            <div className="loading-orbit">

              <div className="loading-cross">
                ✚
              </div>

            </div>


            <p className="loading-label">
              RURALCARE CARE ENGINE
            </p>


            <h1>
              Finding the best
              <br />
              care for you...
            </h1>


            <p>
              We're comparing available healthcare
              options based on distance, availability
              and accessibility.
            </p>


            <div className="loading-factors">

              <span>
                <CheckCircle size={15} />
                Distance
              </span>

              <span>
                <CheckCircle size={15} />
                Availability
              </span>

              <span>
                <CheckCircle size={15} />
                Accessibility
              </span>

            </div>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="results-shell">

        <header className="results-header">

          <div className="results-logo">

            <span className="results-logo-icon">
              ✚
            </span>

            <span>
              RuralCare
            </span>

          </div>


          <button
            className="results-back-button"
            onClick={onBack}
          >

            <ArrowLeft size={18} />

            Back

          </button>

        </header>


        <main className="results-main">

          <div className="results-error">

            <div className="error-icon">
              !
            </div>


            <span className="loading-label">
              CARE ENGINE
            </span>


            <h1>
              We couldn't find
              <br />
              your care option.
            </h1>


            <p>
              {error}
            </p>


            <button
              className="primary-results-button"
              onClick={onBack}
            >
              Try again
            </button>

          </div>

        </main>

      </div>

    );

  }


  // =====================================================
  // BACKEND RESULT
  // =====================================================

  const bestOption =
    careResult?.bestOption;


  const recommendation =
    careResult?.recommendation;


  const isMobileOutreach =
    recommendation === "mobile_outreach";


  const careMode =
    recommendation === "telemedicine"
      ? "telemedicine"
      : "physical";


  const distance =
    bestOption?.distance ?? null;


  const provider =
    bestOption?.provider ??
    "Mobile healthcare team";


  const facility =
    bestOption?.facility ??
    "Nearby healthcare facility";


  const specialization =
    bestOption?.specialization ??
    "General Medicine";


  const score =
    bestOption?.score ?? 0;


  const recommendationTitle =
    recommendation === "telemedicine"
      ? "Teleconsultation recommended"
      : isMobileOutreach
      ? "Mobile outreach recommended"
      : "In-person care recommended";


  const recommendationText =
    careResult?.message ??
    "RuralCare selected this option based on accessibility, availability, distance and connectivity.";


  // =====================================================
  // MAIN
  // =====================================================

  return (

    <div className="results-shell">


      {/* HEADER */}

      <header className="results-header">

        <div className="results-logo">

          <span className="results-logo-icon">
            ✚
          </span>

          <span>
            RuralCare
          </span>

        </div>


        <button
          className="results-back-button"
          onClick={onBack}
        >

          <ArrowLeft size={18} />

          Back

        </button>

      </header>



      <main className="results-main">


        {/* INTRO */}

        <section className="results-intro">

          <div>

            <span className="results-eyebrow">
              YOUR CARE PLAN
            </span>


            <h1>
              The best care
              <br />
              option for you.
            </h1>


            <p>
              RuralCare finds the most accessible
              way to get the care you need —
              without unnecessary travel.
            </p>

          </div>


          <div className="location-pill">

            <MapPin size={15} />

            Location detected

            <span className="location-check">
              ✓
            </span>

          </div>

        </section>



        {/* BEST OPTION */}

        <section className="best-option-card">


          <div className="best-option-top">

            <div className="best-badge">

              <CheckCircle size={15} />

              BEST OPTION

            </div>


            <span className="engine-badge">

              <ShieldCheck size={14} />

              Care engine recommendation

            </span>

          </div>



          {/* MOBILE OUTREACH */}

          {isMobileOutreach ? (

            <>

              <div className="provider-header">

                <div className="provider-icon outreach">

                  <Ambulance size={27} />

                </div>


                <div>

                  <p className="provider-label">
                    Community healthcare
                  </p>

                  <h2>
                    Mobile Medical Outreach
                  </h2>

                </div>

              </div>


              <div className="care-type outreach-type">

                <Ambulance size={18} />

                <span>
                  Mobile outreach recommended
                </span>

              </div>


              <div className="outreach-message">

                <div className="outreach-message-icon">
                  <MapPin size={19} />
                </div>

                <div>

                  <strong>
                    Care should come closer to you
                  </strong>

                  <p>
                    No suitable nearby provider is
                    currently available. RuralCare
                    recommends bringing healthcare
                    closer instead of making you
                    travel unnecessarily.
                  </p>

                </div>

              </div>


              <div className="accessibility-summary">

                <div className="accessibility-item">

                  <strong>
                    {score || "—"}
                  </strong>

                  <span>
                    Access score
                  </span>

                </div>


                <div className="accessibility-item">

                  <strong>
                    0
                  </strong>

                  <span>
                    Nearby providers
                  </span>

                </div>


                <div className="accessibility-item">

                  <strong>
                    Mobile
                  </strong>

                  <span>
                    Care pathway
                  </span>

                </div>

              </div>

            </>

          ) : (

            <>

              {/* PROVIDER */}

              <div className="provider-header">

                <div className="provider-icon">

                  {careMode === "telemedicine"
                    ? <Video size={27} />
                    : <Stethoscope size={27} />
                  }

                </div>


                <div>

                  <p className="provider-label">

                    {careMode === "telemedicine"
                      ? "REMOTE HEALTHCARE"
                      : specialization
                    }

                  </p>


                  <h2>
                    {provider}
                  </h2>

                </div>

              </div>



              {/* CARE TYPE */}

              <div className="care-type">

                {careMode === "telemedicine"
                  ? <Video size={18} />
                  : <Stethoscope size={18} />
                }


                <span>
                  {recommendationTitle}
                </span>

              </div>



              {/* CARE INFORMATION */}

              <div className="care-info">

                {careMode === "telemedicine" ? (

                  <>

                    <div>

                      <Video size={18} />

                      <span>
                        Remote consultation
                      </span>

                    </div>


                    <div>

                      <Clock size={18} />

                      <span>
                        Provider available
                      </span>

                    </div>


                    <div className="available">

                      <span className="status-dot"></span>

                      No facility travel

                    </div>

                  </>

                ) : (

                  <>

                    <div>

                      <MapPin size={18} />

                      <span>

                        {distance !== null
                          ? `${distance} km away`
                          : "Distance unavailable"
                        }

                      </span>

                    </div>


                    <div>

                      <Clock size={18} />

                      <span>
                        Travel time depends on route
                      </span>

                    </div>


                    <div className="available">

                      <span className="status-dot"></span>

                      Available

                    </div>

                  </>

                )}

              </div>



              {/* SCORE */}

              <div className="accessibility-summary">


                {careMode === "telemedicine" ? (

                  <>

                    <div className="accessibility-item">

                      <strong>
                        0 km
                      </strong>

                      <span>
                        Facility travel
                      </span>

                    </div>


                    <div className="accessibility-item">

                      <strong>
                        Remote
                      </strong>

                      <span>
                        Care access
                      </span>

                    </div>


                    <div className="accessibility-item score-item">

                      <strong>
                        {score || "—"}
                      </strong>

                      <span>
                        Access score
                      </span>

                    </div>

                  </>

                ) : (

                  <>

                    <div className="accessibility-item">

                      <strong>
                        {distance !== null
                          ? `${distance} km`
                          : "—"
                        }
                      </strong>

                      <span>
                        Distance
                      </span>

                    </div>


                    <div className="accessibility-item score-item">

                      <strong>
                        {score || "—"}
                      </strong>

                      <span>
                        Access score
                      </span>

                    </div>


                    <div className="accessibility-item">

                      <strong>
                        Available
                      </strong>

                      <span>
                        Today
                      </span>

                    </div>

                  </>

                )}

              </div>

            </>

          )}



          {/* WHY */}

          <div className="recommendation-box">

            <div className="recommendation-title">

              <Brain size={18} />

              <h3>
                Why RuralCare recommends this
              </h3>

            </div>


            <p>
              {recommendationText}
            </p>

          </div>



          {/* TELEMEDICINE */}

          {careMode === "telemedicine" && (

            <div className="recommendation-box info-box">

              <div className="recommendation-title">

                <Wifi size={18} />

                <h3>
                  What this means for you
                </h3>

              </div>


              <p>

                You may be able to speak with{" "}

                <strong>
                  {provider}
                </strong>

                {" "}remotely without travelling
                to the facility.

              </p>

            </div>

          )}



          {/* PHYSICAL */}

          {careMode === "physical" &&
            !isMobileOutreach && (

            <div className="recommendation-box info-box">

              <div className="recommendation-title">

                <Navigation size={18} />

                <h3>
                  Recommended facility
                </h3>

              </div>


              <p>

                <strong>
                  {facility}
                </strong>

                {" "}is approximately{" "}

                <strong>
                  {distance ?? "—"} km
                </strong>

                {" "}from your detected location.

              </p>

            </div>

          )}



          {/* ACTIONS */}

          {!isMobileOutreach && (

            <div className="care-actions">

              {careMode === "telemedicine" ? (

                <button
                  className="directions-button"
                  onClick={() =>
                    setDetailsType("telemedicine")
                  }
                >

                  <Video size={19} />

                  Start Teleconsultation

                </button>

              ) : (

                <button
                  className="directions-button"
                  onClick={() =>
                    setDetailsType("facility")
                  }
                >

                  <Navigation size={19} />

                  Get Directions

                </button>

              )}


              <button
                className="call-button"
                onClick={() =>
                  setDetailsType(
                    careMode === "telemedicine"
                      ? "telemedicine"
                      : "facility"
                  )
                }
              >

                <Phone size={19} />

                Call

              </button>

            </div>

          )}

        </section>



        {/* HOW WE DECIDED */}

        <section className="decision-card">

          <div className="decision-header">

            <div className="decision-icon">

              <Brain size={21} />

            </div>


            <div>

              <h2>
                How RuralCare decided
              </h2>

              <p>
                We look beyond just distance.
              </p>

            </div>

          </div>



          <div className="decision-factors">


            <div className="factor">

              <div className="factor-icon">
                <CheckCircle size={17} />
              </div>

              <div>

                <strong>
                  Healthcare need
                </strong>

                <span>
                  {specialization}
                </span>

              </div>

            </div>



            <div className="factor">

              <div className="factor-icon">
                <CheckCircle size={17} />
              </div>

              <div>

                <strong>
                  Accessibility
                </strong>

                <span>

                  {careMode === "telemedicine"

                    ? "Remote care avoids facility travel"

                    : isMobileOutreach

                    ? "Mobile outreach reduces travel burden"

                    : `${distance ?? "—"} km from your location`

                  }

                </span>

              </div>

            </div>



            <div className="factor">

              <div className="factor-icon">
                <CheckCircle size={17} />
              </div>

              <div>

                <strong>
                  Availability
                </strong>

                <span>

                  {isMobileOutreach
                    ? "No suitable nearby provider found"
                    : "Provider is currently available"
                  }

                </span>

              </div>

            </div>

          </div>

        </section>



        {/* OTHER OPTIONS */}

        <section className="other-options">


          <div className="section-heading">

            <span className="results-eyebrow">
              ALTERNATIVES
            </span>


            <h2>
              Other ways to get care
            </h2>


            <p>

              If the recommended option doesn't
              work for you, here are alternatives.

            </p>

          </div>



          {/* TELEMEDICINE */}

          <button
            className="alternative-card"
            onClick={() =>
              setDetailsType("telemedicine")
            }
          >

            <div className="alternative-icon">

              <Video size={23} />

            </div>


            <div className="alternative-content">

              <h3>
                Telemedicine
              </h3>

              <p>

                Talk to a doctor remotely without
                travelling to a hospital.

              </p>


              <span className="availability-label">

                Available remotely

              </span>

            </div>


            <ChevronRight
              size={21}
              className="option-arrow"
            />

          </button>



          {/* MOBILE UNIT */}

          <button
            className="alternative-card"
            onClick={() =>
              setDetailsType("mobile")
            }
          >

            <div className="alternative-icon outreach">

              <Ambulance size={23} />

            </div>


            <div className="alternative-content">

              <h3>
                Mobile Medical Unit
              </h3>


              <p>

                A medical team can provide care
                closer to your village.

              </p>


              <span className="availability-label">

                Alternative care option

              </span>

            </div>


            <ChevronRight
              size={21}
              className="option-arrow"
            />

          </button>



          {/* TRANSPORT */}

          <button
            className="alternative-card"
            onClick={() =>
              setDetailsType("transport")
            }
          >

            <div className="alternative-icon">

              <Navigation size={23} />

            </div>


            <div className="alternative-content">

              <h3>
                Need help getting there?
              </h3>


              <p>

                Explore available transport options
                to reach the recommended facility.

              </p>


              <span className="availability-label">

                Explore transport

              </span>

            </div>


            <ChevronRight
              size={21}
              className="option-arrow"
            />

          </button>


        </section>


      </main>

    </div>

  );

}


export default Results;