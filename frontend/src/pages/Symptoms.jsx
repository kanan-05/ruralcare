import { useState } from "react";

import {
  ArrowLeft,
  Mic,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import "../App.css";
import "./Symptoms.css";


function Symptoms({ onBack, onContinue }) {

  const [symptoms, setSymptoms] = useState([]);
  const [severeBreathing, setSevereBreathing] = useState(null);


  const symptomOptions = [
    {
      emoji: "🤒",
      label: "Fever",
    },
    {
      emoji: "🤕",
      label: "Headache",
    },
    {
      emoji: "🤧",
      label: "Cough / Cold",
    },
    {
      emoji: "😣",
      label: "Body pain",
    },
    {
      emoji: "🤢",
      label: "Stomach problem",
    },
    {
      emoji: "🫁",
      label: "Breathing problem",
    },
    {
      emoji: "🤮",
      label: "Vomiting",
    },
    {
      emoji: "🩹",
      label: "Other pain",
    },
  ];


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
      alert("Please answer the quick safety check.");
      return;
    }

    /*
      Emergency decision

      We intentionally do NOT diagnose.
      A positive answer to severe breathing difficulty
      simply sends the patient into the emergency flow.
    */

    if (severeBreathing === true) {

      onContinue({
        symptoms,
        severeBreathing,
        emergency: true,
      });

      return;
    }


    onContinue({
      symptoms,
      severeBreathing,
      emergency: false,
    });

  };


  return (

    <div className="symptoms-page">

      {/* HEADER */}

      <header className="symptoms-header">

        <div className="symptoms-brand">

          <div className="symptoms-logo">
            ✚
          </div>

          <div>
            <h1>RuralCare</h1>
            <span>Find the right care</span>
          </div>

        </div>


        <button
          className="symptoms-back"
          onClick={onBack}
        >

          <ArrowLeft size={18} />

          <span>Back</span>

        </button>

      </header>


      {/* MAIN */}

      <main className="symptoms-main">


        {/* PROGRESS */}

        <div className="flow-progress">

          <div className="progress-step completed">
            <span>1</span>
            Your need
          </div>

          <div className="progress-line active"></div>

          <div className="progress-step current">
            <span>2</span>
            Symptoms
          </div>

          <div className="progress-line"></div>

          <div className="progress-step">
            <span>3</span>
            Care options
          </div>

        </div>


        {/* HERO */}

        <section className="symptoms-hero">

          <div className="hero-badge">
            <ShieldCheck size={16} />
            Quick safety check
          </div>


          <h2>
            How are you
            <br />
            feeling today?
          </h2>


          <p>
            Tell us what you're experiencing.
            We'll help you find the most accessible
            way to get care.
          </p>

        </section>


        {/* CARD */}

        <section className="symptoms-card">


          {/* SYMPTOMS */}

          <div className="section-heading">

            <div>

              <h3>
                What are you experiencing?
              </h3>

              <p>
                Select everything that applies.
              </p>

            </div>


            {symptoms.length > 0 && (

              <span className="selected-count">
                {symptoms.length} selected
              </span>

            )}

          </div>


          <div className="symptom-grid">

            {symptomOptions.map((item) => {

              const selected =
                symptoms.includes(item.label);

              return (

                <button
                  key={item.label}
                  type="button"
                  className={
                    selected
                      ? "symptom-option selected"
                      : "symptom-option"
                  }
                  onClick={() =>
                    toggleSymptom(item.label)
                  }
                >

                  <span className="symptom-emoji">
                    {item.emoji}
                  </span>


                  <span className="symptom-label">
                    {item.label}
                  </span>


                  {selected && (

                    <span className="symptom-check">

                      <CheckCircle size={18} />

                    </span>

                  )}

                </button>

              );

            })}

          </div>


          {/* VOICE */}

          <button
            type="button"
            className="voice-input-button"
            onClick={() =>
              alert(
                "Voice input will be available in the next version."
              )
            }
          >

            <div className="voice-icon">
              <Mic size={21} />
            </div>


            <div className="voice-text">

              <strong>
                Tell us using your voice
              </strong>

              <span>
                Helpful when typing is difficult
              </span>

            </div>


            <ArrowRight size={19} />

          </button>


          {/* SAFETY CHECK */}

          <div className="safety-box">

            <div className="safety-title-row">

              <div className="safety-icon">
                <AlertTriangle size={21} />
              </div>


              <div>

                <h3>
                  Quick safety check
                </h3>

                <p>
                  Are you having severe difficulty
                  breathing right now?
                </p>

              </div>

            </div>


            <div className="safety-options">

              <button
                type="button"
                className={
                  severeBreathing === true
                    ? "safety-option danger selected"
                    : "safety-option danger"
                }
                onClick={() =>
                  setSevereBreathing(true)
                }
              >

                <span className="radio">

                  {severeBreathing === true && (
                    <span></span>
                  )}

                </span>

                <div>

                  <strong>
                    Yes, I need help
                  </strong>

                  <small>
                    Take me to emergency care
                  </small>

                </div>

              </button>


              <button
                type="button"
                className={
                  severeBreathing === false
                    ? "safety-option selected"
                    : "safety-option"
                }
                onClick={() =>
                  setSevereBreathing(false)
                }
              >

                <span className="radio">

                  {severeBreathing === false && (
                    <span></span>
                  )}

                </span>

                <div>

                  <strong>
                    No
                  </strong>

                  <small>
                    Continue finding the right care
                  </small>

                </div>

              </button>

            </div>

          </div>


          {/* PRIVACY / DISCLAIMER */}

          <div className="symptoms-note">

            <ShieldCheck size={17} />

            <span>
              RuralCare does not diagnose your condition.
              It helps you decide the safest and most
              accessible next step.
            </span>

          </div>


          {/* CONTINUE */}

          <button
            type="button"
            className="find-care-button"
            onClick={handleContinue}
          >

            <span>
              {severeBreathing === true
                ? "Get emergency help"
                : "Find the right care"}
            </span>

            <ArrowRight size={20} />

          </button>


        </section>

      </main>

    </div>

  );
}


export default Symptoms;