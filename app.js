require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors')


// Regular Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

// Morgan Middleware 
app.use(morgan('tiny'))


// import all routes here
const tweet = require('./routes/tweet')

// router middleware 

app.use('/api/v1', tweet)



module.exports = app;