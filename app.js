const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");

// Middleware for putting body data to request object
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// routes
app.use("/api/v1/users", userRouter);

module.exports = app;
