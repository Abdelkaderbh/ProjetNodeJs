const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  //grep the token from the header
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).send("Authentication Failed : invalid token");
  }
  try {
    const tokenData = token.split(" ")[1];
    const decodeToken = jwt.verify(tokenData, process.env.SECRET_KEY);
    req.userId = decodeToken._id;
    next();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = authenticate;
