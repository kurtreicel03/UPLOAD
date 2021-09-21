const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const exphbs = require('express-handlebars');

const app = express();

// MIDDLEWARE

// SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// SETTING VIEW ENGINE
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');

// FILE UPLOAD MIDDLEWARE
app.use(fileUpload());

const mainRouter = require('./routes/mainRouter');
app.use('/', mainRouter);

module.exports = app;
