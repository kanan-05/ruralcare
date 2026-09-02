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
import "../App.css";

function Results({ need, onBack }) {
  const [detailsType, setDetailsType] = useState(null);

  // Show details screen
  if (detailsType) {
    return (
      <CareDetails
        type={detailsType}
        onBack={() => setDetailsType(null)}
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

        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back
        </button>
      </header>

      <main className="main results-page">

        {/* PAGE INTRO */}
        <section className="hero results-hero">
          <p className="welcome">Your care plan</p>

          <h1>
            The best care
            <br />
            option for you.
          </h1>

          <p className="subtitle">
            RuralCare compared available care options based on your
            healthcare need, location and accessibility.
          </p>
        </section>

        {/* BEST OPTION */}
        <section className="best-option-card">

          <div className="best-badge">
            <CheckCircle size={17} />
            BEST OPTION
          </div>

          <div className="provider-header">
            <div className="provider-icon">
              <Stethoscope size={28} />
            </div>

            <div>
              <p className="provider-label">Healthcare facility</p>
              <h2>Rural Health Center</h2>
            </div>
          </div>

          <div className="care-type">
            <Stethoscope size={18} />
            <span>{need || "General Doctor"}</span>
          </div>

          {/* CARE INFO */}
          <div className="care-info">

            <div>
              <MapPin size={19} />
              <span>3.2 km away</span>
            </div>

            <div>
              <Clock size={19} />
              <span>Open today</span>
            </div>

            <div className="available">
              <span className="status-dot"></span>
              Available
            </div>

          </div>

          {/* RECOMMENDATION */}
          <div className="recommendation">

            <div className="recommendation-title">
              <Brain size={19} />
              <h3>Why RuralCare recommends this</h3>
            </div>

            <p>
              This facility is close to your location and currently
              has the right type of healthcare available. It provides
              the best balance between distance and availability.
            </p>

          </div>

          {/* ACTIONS */}
          <div className="care-actions">

            <button
              className="directions-button"
              onClick={() => setDetailsType("facility")}
            >
              <Navigation size={19} />
              Get Directions
            </button>

            <button
              className="call-button"
              onClick={() => setDetailsType("facility")}
            >
              <Phone size={19} />
              Call
            </button>

          </div>

        </section>

        {/* HOW WE DECIDED */}
        <section className="decision-card">

          <div className="decision-header">

            <div className="decision-icon">
              <Brain size={22} />
            </div>

            <div>
              <h2>How RuralCare decided</h2>

              <p>
                We look beyond just distance.
              </p>
            </div>

          </div>

          <div className="decision-factors">

            <div className="factor">
              <CheckCircle size={19} />

              <div>
                <strong>Healthcare need</strong>
                <span>
                  {need || "General Doctor"} care is available
                </span>
              </div>
            </div>

            <div className="factor">
              <CheckCircle size={19} />

              <div>
                <strong>Accessibility</strong>
                <span>Only 3.2 km from your location</span>
              </div>
            </div>

            <div className="factor">
              <CheckCircle size={19} />

              <div>
                <strong>Availability</strong>
                <span>Care is available today</span>
              </div>
            </div>

          </div>

        </section>

        {/* OTHER OPTIONS */}
        <section className="other-options">

          <div className="section-heading">
            <div>
              <h2>Other ways to get care</h2>

              <p>
                If the recommended option doesn't work for you,
                here are alternatives.
              </p>
            </div>
          </div>

          {/* TELEMEDICINE */}
          <button
            className="alternative-card"
            onClick={() => setDetailsType("telemedicine")}
          >
            <div className="alternative-icon">
              <Video size={25} />
            </div>

            <div className="alternative-content">
              <h3>Telemedicine</h3>

              <p>
                Talk to a doctor remotely without travelling
                to a hospital.
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
            onClick={() => setDetailsType("mobile")}
          >
            <div className="alternative-icon">
              <Ambulance size={25} />
            </div>

            <div className="alternative-content">
              <h3>Mobile Medical Unit</h3>

              <p>
                A medical team can provide care closer
                to your village.
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
            onClick={() => setDetailsType("transport")}
          >
            <div className="alternative-icon">
              <Navigation size={25} />
            </div>

            <div className="alternative-content">
              <h3>Need help getting there?</h3>

              <p>
                Explore available transport options to reach
                the recommended facility.
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