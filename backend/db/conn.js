const mongoose = require("mongoose");
const password = process.env.DBPASS;

const encodedPassword = encodeURIComponent(password);

const url = `mongodb+srv://sarthaktailor:${encodedPassword}@task-tracker.ik46zwd.mongodb.net/?retryWrites=true&w=majority`;

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
module.exports = connect;
