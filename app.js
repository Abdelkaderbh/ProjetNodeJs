const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const auth = require("./routes/auth");
const salles = require("./routes/salleRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
// Importing the public folder for CSS and images
app.use(express.static("public"));

//database and port env variables
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);

app.use("", auth);
app.use("", salles);

app.set("view engine", "ejs");

//connecting to database url and starting local server
try {
  mongoose.connect(DATABASE_URL).then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  });
} catch (err) {
  console.log("error connecting ");
}
