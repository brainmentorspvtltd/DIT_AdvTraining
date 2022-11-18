const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

// const connectDB = require("./config/db");
// connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on localhost ${PORT}`);
});
