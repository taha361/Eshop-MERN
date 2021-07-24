const express  = require('express');
const app = express();
require('dotenv/config')
const api = process.env.API_URL;

app.get(api+'/', (req,res)=>{
    res.send('hello world')
})
app.listen(3000 , ()=>{
    console.log('app is running in http://localhost:3000');
})