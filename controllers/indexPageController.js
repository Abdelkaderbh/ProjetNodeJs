const jwt = require("jsonwebtoken");

exports.homePage = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
      res.render("index", { user: null, username: null });
      return;
    }
    // Decode token to get user information
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    // Render the page with user information
    res.render("index", { user: decodedToken });
  } catch (err) {
    res.status(404).send("Page not found!");
  }
};
