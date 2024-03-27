const jwt = require("jsonwebtoken");

exports.homePage = async (req, res) => {
  try {
    const token = req.cookies.token;
    let user = null;
    if (!token) {
      res.render("index", { user });
      return;
    }
    // Decode token to get user information
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    user = decodedToken;
    res.render("index", { user });
  } catch (err) {
    res.status(404).send("Page not found!");
  }
};
