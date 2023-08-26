const express = require('express');
const env = require('dotenv');
env.config();
const connect = require('./db/conn')
const registerRouter = require('./routes/registerRouter')
const app = express();

app.use(express.json());
app.use('/register',registerRouter);

app.get('/',(req,res)=>{
    res.send("hello");
})

const port = 3000;
app.listen(port,()=>{
    connect()
    console.log('server is up and running')
})