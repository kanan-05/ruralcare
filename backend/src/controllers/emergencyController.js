const {
  handleEmergency
} = require("../services/emergencyService");


// --------------------------------------------------
// Emergency request controller
// --------------------------------------------------
function createEmergency(req, res) {

  try {

    const result =
      handleEmergency(req.body);


    if (!result.success) {

      return res
        .status(400)
        .json(result);
    }


    res.json(result);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error:
        "Unable to process emergency request."
    });
  }
}


module.exports = {
  createEmergency
};