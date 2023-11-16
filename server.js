//Requiring all the packages necessary and making server.JS as entry point of application
const express = require('express');                //express package to render HTML pages using JS 
const morgan = require('morgan'); //Morgan is used for logging request details
require('dotenv').config();                 
const bodyParser = require('body-parser');         //body-parser to parse the JSON Data 
const mongoose = require('mongoose');              //Mongoose package to connect to back-end mongoDB
const cors = require('cors');                      //Package to connect middle-ware or cross-platform applications
const config = require('./config');

const app = express(); 
                             //wrapping the new express application in app variable 
const PORT = process.env.PORT || 3000
  const MONGO_URL = process.env.MONGO_URL
  const FRONTEND = process.env.FRONTEND
  
  
  const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200
  }
  
app.use(cors(corsOptions))
//express application using required packages 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');
const productSearchRoutes = require('./routes/product-search');

//express application using Routes from this application
app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/search', productSearchRoutes);

//mongoose
mongoose.set('strictQuery', false);
mongoose.connect( MONGO_URL).then((res) => {
    console.log("Database connected");
    app.listen(PORT, () => {
        console.log('NodeAPI app is running on port ${PORT}')
      });
  }).catch(error => {
     console.log(error);
   })
