const fs = require("fs");
const path = require("path");

let dataObject = [];
fs.readFile(
  path.join(__dirname, "../database/data.json"),
  "utf-8",
  (err, data) => {
    dataObject = JSON.parse(data);
  }
);

exports.getAllUsers = (req, res) => {
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

exports.createNewUser = (req, res) => {
  dataObject.push(req.body);
  let dataString = JSON.stringify(dataObject);
  fs.writeFile(
    path.join(__dirname, "../database/data.json"),
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

exports.getUserById = (req, res) => {
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

exports.deleteUserById = (req, res) => {
  let userData = dataObject.filter((element) => {
    if (element._id == req.params.id) {
      return false;
    } else {
      return true;
    }
  });
  let dataString = JSON.stringify(userData);
  console.log(userData);
  fs.writeFile(
    path.join(__dirname, "../database/data.json"),
    dataString,
    (err) => {
      if (!err) {
        res
          .status(200)
          .json({ status: "success", message: "user deleted successfully" });
      }
    }
  );
};

exports.updateUserDataById = (req, res) => {
  let IndexOfObjectToBeUpdated = null;
  let counter = 0;
  for (counter = 0; counter < dataObject.length; counter++) {
    if (dataObject[counter]._id == req.params.id) {
      IndexOfObjectToBeUpdated = counter;
      break;
    }
  }
  // replacing the old element with updated one
  dataObject.splice(IndexOfObjectToBeUpdated, 1, req.body);
  let dataString = JSON.stringify(dataObject);
  fs.writeFile(
    path.join(__dirname, "../database/data.json"),
    dataString,
    (err) => {
      if (!err) {
        res
          .status(200)
          .json({ status: "success", message: "user updated successfully" });
      }
    }
  );
};
