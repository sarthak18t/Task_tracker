const express = require("express");
const env = require("dotenv");
const cors = require("cors");
env.config();
const connect = require("./db/conn");
const registerRouter = require("./routes/registerRouter");
const loginRouter = require("./routes/loginRouter");
const logoutRouter = require("./routes/logoutRouter");
const taskRouter = require("./routes/tasks/taskRouter");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
  res.send("hello world");
})
connect().then(() => {
  // users registration and login logout 
  app.use("/register", registerRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);

  //task endpoints
  app.use("/task",taskRouter);

  const port = 3001;
  app.listen(port, () => {
    console.log(`server is up and running ${port}`);
  });
});
