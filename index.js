// Loads .env file contents into process.env bu default.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const pfServer = express()
const router =require('./Routes/router')
require('./db/connection')

// creates an Express application
pfServer.use(cors())
pfServer.use(express.json())
pfServer.use(router)
const PORT = 5367 || process.env.PORT

pfServer.listen(PORT,()=>{
    console.log(`Project fair server at port : ${PORT} and waiting for client request`);
})

pfServer.get('/',(req,res)=>{
    res.send(`<h1>Project fair server started and waiting for client request</h1>`)
})

pfServer.post('/',(req,res)=>{
    res.send(`post request`)
})