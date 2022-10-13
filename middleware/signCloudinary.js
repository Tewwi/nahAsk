const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const signCloud = async (req, res) => {
  // TODO: CHECK TO MAKE SURE AUTHENTICATED

  // Get the timestamp in seconds
  const timestamp = Math.round(new Date().getTime() / 1000);

  // Get the signature using the Node.js SDK method api_sign_request
  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );

  res.status(200).json({ timestamp: timestamp, signature: signature });
};

module.exports = signCloud;
