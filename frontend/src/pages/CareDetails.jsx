import { useState } from "react";

import {
  ArrowLeft,
  MapPin,
  Phone,
  Video,
  Ambulance,
  Navigation,
  Clock,
  CheckCircle,
  Calendar,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "../App.css";

function CareDetails({ type, onBack }) {
  const [actionStarted, setActionStarted] = useState(false);

  const details = {
    telemedicine: {
      title: "Telemedicine",
      subtitle: "Talk to a doctor without travelling.",
      icon: Video,
      availability: "Available now",
      description:
        "Connect with a qualified doctor remotely from your village using your phone.",
      action: "Connect to Doctor",
      location: "Remote consultation",
      time: "Available today",
      next:
        "You will be connected to a healthcare professional through a remote consultation.",
    },

    mobile: {
      title: "Mobile Medical Unit",
      subtitle: "Healthcare comes closer to your village.",
      icon: Ambulance,
      availability: "Visiting your area tomorrow",
      description:
        "A mobile medical team can provide basic healthcare services closer to your community.",
      action: "View Visit Details",
      location: "Your village area",
      time: "Tomorrow",
      next:
        "The mobile medical team is expected to visit your area tomorrow. Visit details can be confirmed before you travel.",
    },

    transport: {
      title: "Transport Assistance",
      subtitle: "Get help reaching your recommended facility.",
      icon: Navigation,
      availability: "Transport options available",
      description:
        "Explore available transport options to help you reach the recommended healthcare facility.",
      action: "Find Transport",
      location: "Recommended facility",
      time: "~10 min travel",
      next:
        "Choose a transport option that works for you and confirm availability before travelling.",
    },

    facility: {
      title: "Rural Health Center",
      subtitle: "Your recommended healthcare facility.",
      icon: MapPin,
      availability: "Open today",
      description:
        "This facility was selected because it provides suitable care close to your location.",
      action: "Get Directions",
      location: "3.2 km away",
      time: "~10 min travel",
      next:
        "Follow the directions to reach the recommended healthcare facility.",
    },
  };

  const selected = details[type] || details.facility;
  const Icon = selected.icon;

  const handleAction = () => {
    setActionStarted(true);
  };

  const handleCall = () => {
    window.location.href = "tel:";
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div className="logo">
          <span className="logo-icon">✚</span>
          <span>RuralCare</span>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          <ArrowLeft size={20} />
          Back
        </button>

      </header>

      <main className="main details-page">

        {/* HERO */}
        <section className="hero details-hero">

          <p className="welcome">
            Care option
          </p>

          <h1>
            {selected.title}
          </h1>

          <p className="subtitle">
            {selected.subtitle}
          </p>

        </section>

        {/* MAIN CARD */}
        <section className="details-card">

          <div className="details-icon">
            <Icon size={34} />
          </div>

          <h2>
            {selected.title}
          </h2>

          <div className="details-status">
            <span className="status-dot"></span>
            {selected.availability}
          </div>

          <p className="details-description">
            {selected.description}
          </p>

          {/* INFORMATION */}
          <div className="details-info">

            <div className="detail-info-item">
              <MapPin size={19} />

              <div>
                <strong>Location</strong>
                <span>{selected.location}</span>
              </div>
            </div>

            <div className="detail-info-item">
              <Clock size={19} />

              <div>
                <strong>Availability</strong>
                <span>{selected.time}</span>
              </div>
            </div>

            <div className="detail-info-item">
              <CheckCircle size={19} />

              <div>
                <strong>Care suitability</strong>
                <span>
                  Suitable for your selected need
                </span>
              </div>
            </div>

            <div className="detail-info-item">
              <ShieldCheck size={19} />

              <div>
                <strong>Accessibility</strong>
                <span>
                  Designed to reduce unnecessary travel
                </span>
              </div>
            </div>

          </div>

          {/* ACTION */}
          {!actionStarted ? (

            <button
              className="details-action"
              onClick={handleAction}
            >
              <Icon size={20} />
              {selected.action}
              <ArrowRight size={19} />
            </button>

          ) : (

            <div className="action-success">

              <div className="action-success-icon">
                <CheckCircle size={24} />
              </div>

              <div>
                <strong>
                  Next step ready
                </strong>

                <p>
                  {selected.next}
                </p>
              </div>

            </div>

          )}

          {/* FACILITY CALL */}
          {type === "facility" && (

            <button
              className="secondary-action"
              onClick={handleCall}
            >
              <Phone size={19} />
              Call Facility
            </button>

          )}

        </section>

        {/* WHAT HAPPENS NEXT */}
        <section className="next-step-card">

          <div className="next-step-icon">
            <Calendar size={22} />
          </div>

          <div>

            <h3>
              What happens next?
            </h3>

            <p>
              {selected.next}
            </p>

          </div>

        </section>

        {/* TRUST MESSAGE */}
        <section className="trust-card">

          <CheckCircle size={22} />

          <div>

            <h3>
              RuralCare recommendation
            </h3>

            <p>
              We help you choose an accessible care
              option based on your healthcare need,
              availability and travel requirements.
              Always seek emergency medical help
              when needed.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default CareDetails;