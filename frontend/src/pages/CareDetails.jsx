import {
  ArrowLeft,
  MapPin,
  Phone,
  Video,
  Ambulance,
  Navigation,
  Clock,
  CheckCircle,
} from "lucide-react";

import "../App.css";

function CareDetails({ type, onBack }) {
  const details = {
    telemedicine: {
      title: "Telemedicine",
      subtitle: "Talk to a doctor without travelling.",
      icon: Video,
      availability: "Available now",
      description:
        "Connect with a qualified doctor remotely from your village using your phone.",
      action: "Connect to Doctor",
    },

    mobile: {
      title: "Mobile Medical Unit",
      subtitle: "Healthcare comes closer to your village.",
      icon: Ambulance,
      availability: "Visiting your area tomorrow",
      description:
        "A mobile medical team can provide basic healthcare services closer to your community.",
      action: "View Visit Details",
    },

    transport: {
      title: "Transport Assistance",
      subtitle: "Get help reaching your recommended facility.",
      icon: Navigation,
      availability: "Transport options available",
      description:
        "Explore available transport options to help you reach the recommended healthcare facility.",
      action: "Find Transport",
    },

    facility: {
      title: "Rural Health Center",
      subtitle: "Your recommended healthcare facility.",
      icon: MapPin,
      availability: "Open today",
      description:
        "This facility was selected because it provides suitable care close to your location.",
      action: "Get Directions",
    },
  };

  const selected = details[type] || details.facility;
  const Icon = selected.icon;

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

      <main className="main details-page">

        {/* INTRO */}
        <section className="hero">
          <p className="welcome">Care option</p>

          <h1>{selected.title}</h1>

          <p className="subtitle">
            {selected.subtitle}
          </p>
        </section>

        {/* MAIN DETAILS CARD */}
        <section className="details-card">

          <div className="details-icon">
            <Icon size={34} />
          </div>

          <h2>{selected.title}</h2>

          <div className="details-status">
            <span className="status-dot"></span>
            {selected.availability}
          </div>

          <p className="details-description">
            {selected.description}
          </p>

          {/* INFORMATION */}
          <div className="details-info">

            <div>
              <CheckCircle size={19} />
              <span>Suitable for your healthcare need</span>
            </div>

            <div>
              <Clock size={19} />
              <span>Availability information shown above</span>
            </div>

            <div>
              <MapPin size={19} />
              <span>Based on your detected location</span>
            </div>

          </div>

          {/* ACTION */}
          <button className="details-action">
            <Icon size={20} />
            {selected.action}
          </button>

          {/* CALL FOR FACILITY */}
          {type === "facility" && (
            <button className="secondary-action">
              <Phone size={19} />
              Call Facility
            </button>
          )}

        </section>

        {/* TRUST MESSAGE */}
        <section className="trust-card">

          <CheckCircle size={22} />

          <div>
            <h3>RuralCare recommendation</h3>

            <p>
              We help you choose an accessible care option.
              Always seek emergency medical help when needed.
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}

export default CareDetails;