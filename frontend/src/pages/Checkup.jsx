import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Stethoscope,
} from "lucide-react";

import "../App.css";

function Checkup({ onBack, onContinue }) {
  const [checkupType, setCheckupType] = useState("");

  const checkupOptions = [
    {
      id: "general",
      icon: "🩺",
      title: "General health check-up",
      description: "Routine check of your overall health",
    },
    {
      id: "blood",
      icon: "🩸",
      title: "Blood test",
      description: "Tests such as sugar, cholesterol or haemoglobin",
    },
    {
      id: "heart",
      icon: "❤️",
      title: "Blood pressure & heart",
      description: "Check blood pressure and basic heart health",
    },
    {
      id: "women",
      icon: "👩",
      title: "Women's health",
      description: "Routine women's health screening",
    },
    {
      id: "senior",
      icon: "👴",
      title: "Senior citizen check-up",
      description: "Routine health monitoring for older adults",
    },
    {
      id: "unsure",
      icon: "❓",
      title: "I'm not sure",
      description: "Help me decide what kind of care I need",
    },
  ];

  const handleContinue = () => {
    if (!checkupType) {
      alert("Please select a check-up option.");
      return;
    }

    onContinue(checkupType);
  };

  return (
    <div className="app">
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

      <main className="main">
        <section className="hero">
          <p className="welcome">
            Let's find the right check-up
          </p>

          <h1>
            What kind of
            <br />
            check-up do you need?
          </h1>

          <p className="subtitle">
            Choose the option that best matches what
            you're looking for.
          </p>
        </section>

        <section className="care-card">
          <h2>Choose a check-up</h2>

          <p className="hint">
            You can select the closest option.
          </p>

          <div className="checkup-options">
            {checkupOptions.map((option) => (
              <button
                key={option.id}
                className={
                  checkupType === option.id
                    ? "checkup-button selected"
                    : "checkup-button"
                }
                onClick={() => setCheckupType(option.id)}
              >
                <div className="checkup-icon">
                  {option.icon}
                </div>

                <div className="checkup-content">
                  <strong>{option.title}</strong>
                  <span>{option.description}</span>
                </div>

                {checkupType === option.id && (
                  <CheckCircle size={21} />
                )}
              </button>
            ))}
          </div>

          <button
            className="continue-button"
            onClick={handleContinue}
          >
            Find check-up options
            <Stethoscope size={20} />
          </button>
        </section>
      </main>
    </div>
  );
}

export default Checkup;