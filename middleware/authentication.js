const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (token == null) {
      req.user = null;
      next();
    } else {
      let decodeToken = jwt.verify(token, process.env.SECRET_KEY);
      decodeToken ? (req.userId = decodeToken.id) : (req.user = null);
    }
    next();
  } catch (err) {
    return res.status(401).send(err.message);
  }
};

module.exports = authenticate;
