import { useState } from "react";

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
} from "lucide-react";

import CareDetails from "./CareDetails";
import Transport from "./Transport";
import "../App.css";


function Results({
  need,
  symptomData,
  checkupType,
  onBack,
}) {

  const [detailsType, setDetailsType] = useState(null);


  // =========================================
  // DECIDE THE MOST ACCESSIBLE CARE PATHWAY
  // =========================================

  let careMode = "physical";

  let recommendationTitle =
    "In-person care recommended";

  let recommendationText =
    "A nearby healthcare facility is the most suitable option for you.";


  // =========================================
  // SYMPTOM FLOW
  // =========================================

  if (need === "Symptoms") {

    // Breathing problem requires physical assessment

    if (
      symptomData?.symptoms?.includes(
        "🫁 Breathing problem"
      )
    ) {

      careMode = "physical";

      recommendationTitle =
        "Physical consultation recommended";

      recommendationText =
        "Because you reported a breathing problem, an in-person medical assessment may be more appropriate.";

    } else {

      // Other symptoms can start with teleconsultation

      careMode = "telemedicine";

      recommendationTitle =
        "Teleconsultation may be suitable";

      recommendationText =
        "Based on the initial safety check, we did not identify an emergency trigger. Starting with a remote consultation may help you avoid unnecessary travel.";

    }
  }


  // =========================================
  // CHECK-UP FLOW
  // =========================================

  if (need === "Check-up") {

    careMode = "physical";

    recommendationTitle =
      "In-person check-up recommended";


    if (checkupType === "general") {

      recommendationText =
        "A general health check-up is best completed at a healthcare facility where basic health measurements can be taken.";

    } else if (checkupType === "blood") {

      recommendationText =
        "A blood test requires access to the appropriate testing facilities, so an in-person visit is recommended.";

    } else if (checkupType === "heart") {

      recommendationText =
        "Blood pressure and basic heart health checks are best carried out at a healthcare facility.";

    } else if (checkupType === "women") {

      recommendationText =
        "A routine women's health screening is best arranged through an appropriate healthcare provider.";

    } else if (checkupType === "senior") {

      recommendationText =
        "A routine senior health check-up is best completed with an in-person healthcare provider.";

    } else if (checkupType === "unsure") {

      recommendationText =
        "An in-person healthcare provider can help determine which routine check-up is most appropriate for you.";

    }
  }


  // =========================================
  // CHILDREN'S DOCTOR FLOW
  // =========================================

  if (need === "Children's Doctor") {

    careMode = "physical";

    recommendationTitle =
      "Pediatric care recommended";

    recommendationText =
      "A child-focused healthcare provider is recommended so your child can receive age-appropriate medical care close to your location.";

  }


  // =========================================
  // WOMEN'S HEALTH FLOW
  // =========================================

  if (need === "Women's Health") {

    careMode = "physical";

    recommendationTitle =
      "Women's health care recommended";

    recommendationText =
      "A suitable women's healthcare provider or facility is recommended based on your selected care need and accessibility.";

  }


  // =========================================
  // OTHER / GENERAL CARE
  // =========================================

  if (need === "Other") {

    careMode = "physical";

    recommendationTitle =
      "General healthcare recommended";

    recommendationText =
      "A nearby healthcare facility can help you identify the most appropriate care for your needs.";

  }


  // =========================================
  // SHOW CARE DETAILS
  // =========================================

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


  // =========================================
  // MAIN RESULTS PAGE
  // =========================================

  return (

    <div className="app">


      {/* HEADER */}

      <header className="header">

        <div className="logo">

          <span className="logo-icon">
            ✚
          </span>

          <span>
            RuralCare
          </span>

        </div>


        <button
          className="back-button"
          onClick={onBack}
        >

          <ArrowLeft size={20} />

          Back

        </button>

      </header>



      <main className="main results-page">


        {/* ================================= */}
        {/* PAGE INTRO */}
        {/* ================================= */}

        <section className="hero results-hero">

          <p className="welcome">
            Your care plan
          </p>


          <h1>

            The best care
            <br />
            option for you.

          </h1>


          <p className="subtitle">

            RuralCare helps you find an accessible
            way to get the care you need while
            avoiding unnecessary travel.

          </p>

        </section>



        {/* ================================= */}
        {/* BEST OPTION */}
        {/* ================================= */}

        <section className="best-option-card">


          {/* BEST BADGE */}

          <div className="best-badge">

            <CheckCircle size={17} />

            BEST OPTION

          </div>



          {/* PROVIDER HEADER */}

          <div className="provider-header">


            <div className="provider-icon">

              {careMode === "telemedicine" ? (

                <Video size={28} />

              ) : (

                <Stethoscope size={28} />

              )}

            </div>


            <div>

              <p className="provider-label">

                {careMode === "telemedicine"
                  ? "Remote healthcare"
                  : need === "Children's Doctor"
                  ? "Child healthcare"
                  : need === "Women's Health"
                  ? "Women's healthcare"
                  : "Healthcare facility"}

              </p>


              <h2>

                {careMode === "telemedicine"

                  ? "Telemedicine Consultation"

                  : need === "Children's Doctor"

                  ? "Child Healthcare Center"

                  : need === "Women's Health"

                  ? "Women's Health Center"

                  : "Rural Health Center"}

              </h2>

            </div>

          </div>



          {/* CARE TYPE */}

          <div className="care-type">

            {careMode === "telemedicine" ? (

              <Video size={18} />

            ) : (

              <Stethoscope size={18} />

            )}


            <span>

              {recommendationTitle}

            </span>

          </div>



          {/* ================================= */}
          {/* CARE INFORMATION */}
          {/* ================================= */}

          <div className="care-info">


            {careMode === "telemedicine" ? (

              <>

                <div>

                  <Video size={19} />

                  <span>
                    Remote consultation
                  </span>

                </div>


                <div>

                  <Clock size={19} />

                  <span>
                    Available today
                  </span>

                </div>


                <div className="available">

                  <span className="status-dot"></span>

                  No travel needed

                </div>

              </>

            ) : (

              <>

                <div>

                  <MapPin size={19} />

                  <span>
                    3.2 km away
                  </span>

                </div>


                <div>

                  <Clock size={19} />

                  <span>
                    ~10 min travel
                  </span>

                </div>


                <div className="available">

                  <span className="status-dot"></span>

                  Available today

                </div>

              </>

            )}

          </div>



          {/* ================================= */}
          {/* ACCESSIBILITY SUMMARY */}
          {/* ================================= */}

          <div className="accessibility-summary">


            {careMode === "telemedicine" ? (

              <>

                <div className="accessibility-item">

                  <strong>
                    ₹0
                  </strong>

                  <span>
                    Travel cost
                  </span>

                </div>


                <div className="accessibility-item">

                  <strong>
                    0 km
                  </strong>

                  <span>
                    Travel required
                  </span>

                </div>


                <div className="accessibility-item">

                  <strong>
                    Time saved
                  </strong>

                  <span>
                    No facility travel
                  </span>

                </div>

              </>

            ) : (

              <>

                <div className="accessibility-item">

                  <strong>
                    3.2 km
                  </strong>

                  <span>
                    Distance
                  </span>

                </div>


                <div className="accessibility-item">

                  <strong>
                    ~10 min
                  </strong>

                  <span>
                    Estimated travel
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



          {/* ================================= */}
          {/* RECOMMENDATION */}
          {/* ================================= */}

          <div className="recommendation">


            <div className="recommendation-title">

              <Brain size={19} />

              <h3>
                Why RuralCare recommends this
              </h3>

            </div>


            <p>

              {recommendationText}

            </p>

          </div>



          {/* ================================= */}
          {/* EXTRA TELEMEDICINE BENEFIT */}
          {/* ================================= */}

          {careMode === "telemedicine" && (

            <div className="recommendation">

              <div className="recommendation-title">

                <Navigation size={19} />

                <h3>
                  What this means for you
                </h3>

              </div>


              <p>

                You may be able to speak with a
                healthcare professional without
                travelling to a healthcare facility.

              </p>

            </div>

          )}



          {/* ================================= */}
          {/* TRANSPORT SUPPORT */}
          {/* ================================= */}

          {careMode === "physical" && (

            <div className="recommendation">

              <div className="recommendation-title">

                <Navigation size={19} />

                <h3>
                  Need help getting there?
                </h3>

              </div>


              <p>

                Transport options may be available to help
                you reach the recommended healthcare facility.

              </p>

            </div>

          )}



          {/* ================================= */}
          {/* ACTIONS */}
          {/* ================================= */}

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

        </section>



        {/* ================================= */}
        {/* HOW WE DECIDED */}
        {/* ================================= */}

        <section className="decision-card">


          <div className="decision-header">


            <div className="decision-icon">

              <Brain size={22} />

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


            {/* HEALTHCARE NEED */}

            <div className="factor">

              <CheckCircle size={19} />

              <div>

                <strong>
                  Healthcare need
                </strong>


                <span>

                  {need === "Symptoms"

                    ? "Symptom-based care"

                    : need === "Check-up"

                    ? "Routine check-up"

                    : need === "Children's Doctor"

                    ? "Child healthcare"

                    : need === "Women's Health"

                    ? "Women's healthcare"

                    : "General healthcare"}

                </span>

              </div>

            </div>



            {/* ACCESSIBILITY */}

            <div className="factor">

              <CheckCircle size={19} />

              <div>

                <strong>
                  Accessibility
                </strong>


                <span>

                  {careMode === "telemedicine"

                    ? "No facility travel required to start"

                    : "Nearby facility, approximately 3.2 km away"}

                </span>

              </div>

            </div>



            {/* AVAILABILITY */}

            <div className="factor">

              <CheckCircle size={19} />

              <div>

                <strong>
                  Availability
                </strong>


                <span>

                  {careMode === "telemedicine"

                    ? "Remote care available today"

                    : "Care available today"}

                </span>

              </div>

            </div>

          </div>

        </section>



        {/* ================================= */}
        {/* OTHER OPTIONS */}
        {/* ================================= */}

        <section className="other-options">


          <div className="section-heading">

            <div>

              <h2>
                Other ways to get care
              </h2>

              <p>

                If the recommended option doesn't
                work for you, here are alternatives.

              </p>

            </div>

          </div>



          {/* TELEMEDICINE */}

          <button
            className="alternative-card"
            onClick={() =>
              setDetailsType("telemedicine")
            }
          >

            <div className="alternative-icon">

              <Video size={25} />

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
              size={22}
              className="option-arrow"
            />

          </button>



          {/* MOBILE MEDICAL UNIT */}

          <button
            className="alternative-card"
            onClick={() =>
              setDetailsType("mobile")
            }
          >

            <div className="alternative-icon">

              <Ambulance size={25} />

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

                Visiting your area tomorrow

              </span>

            </div>


            <ChevronRight
              size={22}
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

              <Navigation size={25} />

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
              size={22}
              className="option-arrow"
            />

          </button>


        </section>


      </main>

    </div>

  );
}


export default Results;