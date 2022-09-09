const { expressjwt: jwt } = require('express-jwt');
const User = require('../models/User');

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request headers
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") { // Ejemplo: Bearer kdjekdncewnoeiñfewf
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }
  return null;
}

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders //token
});


const isAdmin = (req, res, next) => {
  const payload = req.payload;
  //console.log(payload , " I am the middleware")
  if (req.payload.role === "admin") {
  next()
    } else {
    return res.status(401).json("Unauthorized")
  }
}

module.exports = {
  isAuthenticated, isAdmin
}

