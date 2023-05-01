const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.route");
const loginRoute = require("./routes/login.route");
const logoutRoute = require("./routes/logout.route");
const registerRoute = require("./routes/register.route");

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/register", registerRoute);

app.get("/", (req, res) => {
  res.send("Welcome to home page");
  console.log("Welcome to home page");
});
app.listen(8000, () => {
  console.log("Backend server is running");
});
