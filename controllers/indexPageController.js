exports.homePage = async (req, res) => {
  try {
    res.render("index");
  } catch (err) {
    res.status(404).send("Page not found!");
  }
};
