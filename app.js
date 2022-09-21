const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

// Middleware for putting body data to request object
app.use(express.json());

let dataObject = [];
fs.readFile(
  path.join(__dirname, "/database/data.json"),
  "utf-8",
  (err, data) => {
    dataObject = JSON.parse(data);
  }
);

const getAllUsers = (req, res) => {
  if (dataObject.length == 0) {
    res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
  res
    .status(200)
    .json({ status: "success", results: dataObject.length, data: dataObject });
};

const createNewUser = (req, res) => {
  dataObject.push(req.body);
  let dataString = JSON.stringify(dataObject);
  fs.writeFile(
    path.join(__dirname, "/database/data.json"),
    dataString,
    (err) => {
      if (!err) {
        res
          .status(200)
          .json({ status: "success", message: "user created successfully" });
      }
    }
  );
};

const getUserById = (req, res) => {
  let userData = dataObject.filter((element) => {
    if (element._id == req.params.id) {
      return true;
    }
  });

  if (userData.length == 0) {
    res.status(404).json({
      status: "fail",
      message: "not found",
    });
  }
  console.log(userData);
  res.status(200).json({
    status: "success",
    data: userData,
  });
};

app.get("/api/v1/users", getAllUsers);

app.post("/api/v1/users", createNewUser);

app.get("/api/v1/users/:id");

module.exports = app;
