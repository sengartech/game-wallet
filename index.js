/**
 * importing modules.
 */
let express = require('express');
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');

const config = require('./configs/config.js');

let app = express();

// this will log api request.
app.use(morgan('dev'));

// set request payload parsers.
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/**
 * mongodb connection and error checking.
 */
mongoose.connect(config.mongodb.uri, config.mongOptions);

mongoose.connection.on('error', (err) => {
  console.log(`db connection error: ${err}`);
})

mongoose.connection.on('open', (err) => {
  if (err) {
    console.log(`db connection error: ${err}`);
  } else {
    console.log(`db connection open at: ${config.mongodb.uri}`);
  }
})

/**
 * handling exceptions.
 */
process.on('uncaughtException', (err) => {
  console.log(`uncaught exception occurred`);
  console.log(err);
})

process.on('unhandledRejection', (err) => {
  console.log(`unhandled rejection occurred`);
  console.log(err);
})

// app listens at specified port.
app.listen(config.port)
  .on('error', (err) => {
    console.log(`error occurred while listening: ${err}`);
  })
  .on('listening', () => {
    console.log(`${config.appName} app is listening at port: ${config.port}\n`);
  })
