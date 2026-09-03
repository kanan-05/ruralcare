import {
  ArrowLeft,
  Phone,
  MapPin,
  Ambulance,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";

import "../App.css";


function Emergency({ onBack }) {

  const handleEmergencyCall = () => {
    alert(
      "Emergency assistance should be contacted immediately. Connect this button to the verified local emergency number before deployment."
    );
  };


  const handleFindEmergencyCare = () => {
    alert(
      "Nearest emergency care will be shown here once location services and the healthcare backend are connected."
    );
  };


  return (

    <div className="emergency-page">


      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <header className="emergency-header">

        <div className="emergency-logo">

          <span className="emergency-logo-icon">
            ✚
          </span>

          <span>
            RuralCare
          </span>

        </div>


        <button
          className="emergency-back-button"
          onClick={onBack}
        >

          <ArrowLeft size={20} />

          <span>
            Back
          </span>

        </button>

      </header>



      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <main className="emergency-main">


        {/* ========================================= */}
        {/* ICON */}
        {/* ========================================= */}

        <div className="emergency-icon-wrapper">

          <div className="emergency-icon">

            <Ambulance size={52} />

          </div>

        </div>



        {/* ========================================= */}
        {/* LABEL */}
        {/* ========================================= */}

        <p className="emergency-label">

          EMERGENCY CARE

        </p>



        {/* ========================================= */}
        {/* MAIN HEADING */}
        {/* ========================================= */}

        <h1 className="emergency-title">

          You may need
          <br />

          immediate medical attention

        </h1>



        {/* ========================================= */}
        {/* DESCRIPTION */}
        {/* ========================================= */}

        <p className="emergency-description">

          Severe difficulty breathing can be serious.
          Please do not delay getting medical help.

        </p>



        {/* ========================================= */}
        {/* ACTION BUTTONS */}
        {/* ========================================= */}

        <div className="emergency-actions">


          <button
            className="emergency-call-button"
            onClick={handleEmergencyCall}
          >

            <Phone size={22} />

            <div>

              <strong>
                Get Emergency Help
              </strong>

              <span>
                Contact emergency services
              </span>

            </div>

          </button>



          <button
            className="emergency-location-button"
            onClick={handleFindEmergencyCare}
          >

            <MapPin size={22} />

            <div>

              <strong>
                Find Emergency Care
              </strong>

              <span>
                Locate the nearest facility
              </span>

            </div>

          </button>


        </div>



        {/* ========================================= */}
        {/* IMPORTANT WARNING */}
        {/* ========================================= */}

        <div className="emergency-warning">


          <div className="emergency-warning-icon">

            <ShieldAlert size={24} />

          </div>


          <div>

            <h3>
              Important
            </h3>

            <p>

              If your condition is getting worse,
              seek emergency medical care immediately.

            </p>

          </div>


        </div>



        {/* ========================================= */}
        {/* SAFETY NOTE */}
        {/* ========================================= */}

        <div className="emergency-safety-note">

          <AlertTriangle size={18} />

          <span>

            RuralCare does not diagnose medical conditions.
            This screen is provided to help you reach
            urgent care quickly.

          </span>

        </div>


      </main>

    </div>

  );
}


export default Emergency;