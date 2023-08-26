const mongoose = require("mongoose");
const password = process.env.DBPASS;

const encodedPassword = encodeURIComponent(password);

const url = `mongodb+srv://sarthaktailor:${encodedPassword}@task-tracker.ik46zwd.mongodb.net/?retryWrites=true&w=majority`;

const connect = () => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("database connected");
    })
    .catch((error) => {
      console.log("database not connected", error);
    });
};
module.exports = connect;
