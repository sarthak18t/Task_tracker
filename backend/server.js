const express = require('express');
const env = require('dotenv');
env.config();
const connect = require('./db/conn')
const registerRouter = require('./routes/registerRouter')
const loginRouter = require('./routes/loginRouter')
const logoutRouter = require('./routes/logoutRouter')
const app = express();

app.use(express.json());
app.use('/register',registerRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.get('/',(req,res)=>{
    res.send("hello");
})

const port = 3000;
app.listen(port,()=>{
    connect()
    console.log('server is up and running')
})