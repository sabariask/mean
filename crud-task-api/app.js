const express = require('express');

const app = express();

const mongoose = require('./database/mongoose')

app.listen(3000, ()=>{
    console.log("Server started at 3000");
});