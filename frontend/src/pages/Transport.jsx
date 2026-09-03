import {
  ArrowLeft,
  MapPin,
  Ambulance,
  Car,
  Bike,
  Navigation,
  Clock,
  CheckCircle,
} from "lucide-react";

import "../App.css";

function Transport({ onBack }) {
  const transportOptions = [
    {
      id: "ambulance",
      icon: <Ambulance size={28} />,
      title: "Ambulance",
      description:
        "For patients who need urgent medical transport.",
      info: "Emergency transport",
    },
    {
      id: "community",
      icon: <Car size={28} />,
      title: "Community Transport",
      description:
        "Local transport assistance for reaching the healthcare facility.",
      info: "Community assistance",
    },
    {
      id: "local",
      icon: <Bike size={28} />,
      title: "Local Ride",
      description:
        "A nearby local ride may help you reach the facility.",
      info: "Lower-cost option",
    },
  ];

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


      <main className="main">

        {/* INTRO */}
        <section className="hero">

          <p className="welcome">
            Transport assistance
          </p>

          <h1>
            Need help
            <br />
            getting there?
          </h1>

          <p className="subtitle">
            We can help you explore ways to reach
            the recommended healthcare facility.
          </p>

        </section>


        {/* DESTINATION */}
        <section className="transport-destination">

          <div className="transport-location-icon">
            <MapPin size={26} />
          </div>

          <div>

            <p className="transport-label">
              Recommended healthcare facility
            </p>

            <h2>
              Rural Health Center
            </h2>

            <div className="transport-distance">

              <span>
                <MapPin size={15} />
                3.2 km away
              </span>

              <span>
                <Clock size={15} />
                ~10 min
              </span>

            </div>

          </div>

        </section>


        {/* TRANSPORT OPTIONS */}
        <section className="care-card transport-card">

          <h2>
            Choose how you'd like to travel
          </h2>

          <p className="hint">
            Select the option that works best for you.
          </p>


          <div className="transport-options">

            {transportOptions.map((option) => (

              <button
                key={option.id}
                className="transport-option"
                onClick={() =>
                  alert(
                    `${option.title} selected. Transport booking will be connected to the backend.`
                  )
                }
              >

                <div className="transport-option-icon">
                  {option.icon}
                </div>

                <div className="transport-option-content">

                  <strong>
                    {option.title}
                  </strong>

                  <span>
                    {option.description}
                  </span>

                  <small>
                    <CheckCircle size={14} />
                    {option.info}
                  </small>

                </div>

                <Navigation
                  size={20}
                  className="transport-arrow"
                />

              </button>

            ))}

          </div>


          {/* DIRECTIONS */}
          <button
            className="continue-button"
            onClick={() =>
              alert(
                "Directions will be connected to maps in the final version."
              )
            }
          >
            <Navigation size={20} />
            Get directions

          </button>


          {/* NOTE */}
          <div className="transport-note">

            <strong>
              RuralCare accessibility support
            </strong>

            <p>
              Transport availability and pricing will
              be confirmed based on your location and
              connected local services.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Transport;