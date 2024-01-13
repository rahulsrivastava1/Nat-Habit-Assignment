const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/authRoutes");
const locationRouter = require("./routes/locationRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/location", locationRouter);

module.exports = app;
