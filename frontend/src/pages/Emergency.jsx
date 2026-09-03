import {
  ArrowLeft,
  Phone,
  MapPin,
  Ambulance,
  AlertTriangle,
  ShieldAlert,
  Navigation,
  Clock,
  HeartPulse,
} from "lucide-react";

import "../App.css";
import "./Emergency.css";


function Emergency({ onBack }) {

  const handleEmergencyCall = () => {

    /*
      IMPORTANT:
      Replace the placeholder with a VERIFIED local
      emergency number before deployment.

      Example:
      window.location.href = "tel:VERIFIED_NUMBER";
    */

    alert(
      "Emergency services should be contacted immediately. The verified local emergency number will be connected here."
    );
  };


  const handleFindEmergencyCare = () => {

    /*
      This can later call:
      GET /api/facilities/emergency

      For now, open the patient's map/location service.
    */

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        () => {
          alert(
            "Your location has been detected. Nearby emergency facilities will be shown here."
          );
        },
        () => {
          alert(
            "We couldn't access your location. Please enable location services or seek the nearest emergency facility."
          );
        }
      );

    } else {

      alert(
        "Location services are not available on this device."
      );

    }

  };


  return (

    <div className="emergency-page">


      {/* =========================================
          HEADER
      ========================================= */}

      <header className="emergency-header">

        <div className="emergency-brand">

          <div className="emergency-brand-icon">
            ✚
          </div>

          <div>

            <h1>
              RuralCare
            </h1>

            <span>
              Emergency support
            </span>

          </div>

        </div>


        <button
          className="emergency-back-button"
          onClick={onBack}
        >

          <ArrowLeft size={18} />

          <span>
            Back
          </span>

        </button>

      </header>



      {/* =========================================
          MAIN
      ========================================= */}

      <main className="emergency-main">


        {/* =========================================
            EMERGENCY STATUS
        ========================================= */}

        <div className="emergency-status">

          <div className="emergency-pulse">

            <Ambulance size={34} />

          </div>

        </div>


        <div className="emergency-label">
          EMERGENCY CARE
        </div>


        <h2 className="emergency-title">

          Please get
          <br />

          immediate medical help

        </h2>


        <p className="emergency-description">

          You reported severe difficulty breathing.
          This can be serious and should not be delayed.

        </p>



        {/* =========================================
            PRIMARY ACTIONS
        ========================================= */}

        <section className="emergency-action-card">


          <div className="action-card-heading">

            <HeartPulse size={20} />

            <div>

              <h3>
                What to do now
              </h3>

              <p>
                Choose the fastest way to reach help.
              </p>

            </div>

          </div>



          <button
            className="emergency-call-button"
            onClick={handleEmergencyCall}
          >

            <div className="action-icon red">
              <Phone size={22} />
            </div>


            <div className="action-content">

              <strong>
                Get Emergency Help
              </strong>

              <span>
                Contact emergency services
              </span>

            </div>


            <span className="action-arrow">
              →
            </span>

          </button>



          <button
            className="emergency-location-button"
            onClick={handleFindEmergencyCare}
          >

            <div className="action-icon green">
              <Navigation size={21} />
            </div>


            <div className="action-content">

              <strong>
                Find Emergency Care
              </strong>

              <span>
                Locate the nearest emergency facility
              </span>

            </div>


            <span className="action-arrow">
              →
            </span>

          </button>


        </section>



        {/* =========================================
            DO NOT DELAY
        ========================================= */}

        <section className="do-not-delay">

          <div className="delay-icon">

            <Clock size={20} />

          </div>


          <div>

            <strong>
              Do not delay
            </strong>

            <p>
              If symptoms are getting worse, seek
              emergency medical care immediately.
            </p>

          </div>

        </section>



        {/* =========================================
            SAFETY INFORMATION
        ========================================= */}

        <section className="emergency-info-card">


          <div className="info-icon">

            <ShieldAlert size={22} />

          </div>


          <div>

            <h3>
              While getting help
            </h3>

            <ul>

              <li>
                Stay with someone if possible.
              </li>

              <li>
                Avoid travelling alone if you are severely unwell.
              </li>

              <li>
                If symptoms suddenly worsen, seek emergency assistance immediately.
              </li>

            </ul>

          </div>

        </section>



        {/* =========================================
            LOCATION
        ========================================= */}

        <div className="emergency-location-note">

          <MapPin size={17} />

          <span>
            Your location can help RuralCare identify
            the closest available emergency facility.
          </span>

        </div>



        {/* =========================================
            DISCLAIMER
        ========================================= */}

        <div className="emergency-disclaimer">

          <AlertTriangle size={16} />

          <span>
            RuralCare does not diagnose medical conditions.
            This safety screen is designed to help you reach
            urgent care quickly.
          </span>

        </div>


      </main>

    </div>

  );
}


export default Emergency;