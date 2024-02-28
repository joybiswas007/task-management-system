const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const { authorization: token } = req.headers;

  // Check if token exists
  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  // Extract token from Authorization header
  const accessToken = token.split(" ")[1];
  const { JWT_SECRET } = process.env;
  // Verify token
  jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Unauthorized - Invalid token" });
    }

    // Token is valid, store decoded user data in request object for further use
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authUser;
