const jwt = require('jsonwebtoken');

// Replace with your secret key (store securely in environment variables)
const secretKey = process.env.TOKEN_SECRET_KEY;

const generateTokens = (payload) => {
  // Define payload for access token (e.g., user ID)
  const accessTokenPayload = { userId: payload.userId };
  const accessTokenOptions = { expiresIn: '30m' }; // Access token expires in 30 minutes

  // Define payload for refresh token (can include additional info)
  const refreshTokenPayload = { ...payload, refreshToken: true }; // Mark as refresh token
  const refreshTokenOptions = { expiresIn: '1d' }; // Refresh token expires in 1 day

  const accessToken = jwt.sign(accessTokenPayload, secretKey, accessTokenOptions);
  const refreshToken = jwt.sign(refreshTokenPayload, secretKey, refreshTokenOptions);

  return { accessToken, refreshToken };
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = { generateTokens, verifyRefreshToken };
