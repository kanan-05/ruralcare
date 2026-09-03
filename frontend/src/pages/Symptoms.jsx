import { useState } from "react";
import {
  ArrowLeft,
  Mic,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

import "../App.css";

function Symptoms({ onBack, onContinue }) {
  const [symptoms, setSymptoms] = useState([]);
  const [severeBreathing, setSevereBreathing] = useState(null);

  const toggleSymptom = (symptom) => {
    setSymptoms((current) =>
      current.includes(symptom)
        ? current.filter((item) => item !== symptom)
        : [...current, symptom]
    );
  };

  const handleContinue = () => {
    if (symptoms.length === 0) {
      alert("Please select at least one symptom.");
      return;
    }

    if (severeBreathing === null) {
      alert("Please answer the breathing question.");
      return;
    }

    onContinue({
      symptoms,
      severeBreathing,
    });
  };

  const symptomOptions = [
    "🤒 Fever",
    "🤕 Headache",
    "🤧 Cough / Cold",
    "😣 Body pain",
    "🤢 Stomach problem",
    "🫁 Breathing problem",
    "🤮 Vomiting",
    "🩹 Other pain",
  ];

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
            Let's understand what you need
          </p>

          <h1>
            How are you
            <br />
            feeling today?
          </h1>

          <p className="subtitle">
            Tell us what you're experiencing. We will help
            you find the most accessible way to get care.
          </p>
        </section>

        <section className="care-card">
          <h2>What are you experiencing?</h2>

          <p className="hint">
            Select everything that applies.
          </p>

          <div className="symptom-options">
            {symptomOptions.map((symptom) => (
              <button
                key={symptom}
                className={
                  symptoms.includes(symptom)
                    ? "symptom-button selected"
                    : "symptom-button"
                }
                onClick={() => toggleSymptom(symptom)}
              >
                <span>{symptom}</span>

                {symptoms.includes(symptom) && (
                  <CheckCircle size={18} />
                )}
              </button>
            ))}
          </div>

          <button className="voice-button">
            <Mic size={22} />
            Tell us using your voice
          </button>

          <div className="safety-check">
            <div className="safety-header">
              <AlertTriangle size={21} />

              <div>
                <strong>Quick safety check</strong>

                <p>
                  Are you having severe difficulty breathing right now?
                </p>
              </div>
            </div>

            <div className="safety-buttons">
              <button
  className={
    severeBreathing === true
      ? "selected"
      : ""
  }
  onClick={() => setSevereBreathing(true)}
>
  Yes, I need help
</button>

<button
  className={
    severeBreathing === false
      ? "selected"
      : ""
  }
  onClick={() => setSevereBreathing(false)}
>
  No
</button>
            </div>
          </div>

          <button
            className="continue-button"
            onClick={handleContinue}
          >
            Find the right care
          </button>
        </section>
      </main>
    </div>
  );
}

export default Symptoms;