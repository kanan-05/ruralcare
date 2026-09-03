const { getAIGuidance } =
  require("../services/aiService");

async function guidance(req, res) {
  try {

    const result =
      await getAIGuidance(req.body);

    res.json({
      success: true,
      ...result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
}

module.exports = {
  guidance
};