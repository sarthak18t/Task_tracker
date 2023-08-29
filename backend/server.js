const express = require("express");
const env = require("dotenv");
env.config();
const connect = require("./db/conn");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const taskRouter = require("./routes/tasks/taskRouter");
const app = express();

connect().then(() => {
  app.use(express.json());

  // users registration and login logout 
  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);

  //task endpoints
  app.use("/task",taskRouter);

  const port = 5000;
  app.listen(port, () => {
    console.log("server is up and running");
  });
});
