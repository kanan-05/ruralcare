const OLLAMA_URL = "http://localhost:11434/api/generate";
const OLLAMA_MODEL = "llama3:latest";

const SYSTEM_PROMPT = `
You are RuralCare's supportive healthcare assistant.

You are NOT a doctor.

STRICT RULES:
- Never diagnose a disease.
- Never prescribe medicines.
- Never give medicine dosage.
- Never tell the patient to start, stop, or change medication.
- Give safe general supportive guidance only.
- You may suggest rest, hydration, monitoring symptoms and seeking professional care.
- If the patient missed prescribed medicine, tell them to follow their doctor's prescription and contact their doctor/pharmacist if unsure.
- Identify warning signs requiring urgent medical attention.
- Use simple language.
- Respond in the patient's requested language.

Return ONLY JSON:

{
  "summary": "",
  "urgency": "routine|soon|urgent|emergency",
  "supportiveAdvice": [],
  "medicationReminder": "",
  "doctorAdvice": "",
  "redFlags": []
}
`;

async function getAIGuidance({
  message,
  language = "English"
} = {}) {

  if (!message) {
    throw new Error("Patient message is required");
  }

  const prompt = `
${SYSTEM_PROMPT}

Patient language: ${language}

Patient says:
${message}
`;

  const response = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
      format: "json"
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = await response.json();

  return JSON.parse(data.response);
}

module.exports = {
  getAIGuidance
};