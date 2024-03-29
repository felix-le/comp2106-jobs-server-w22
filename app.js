const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
// create the express app & enable form parsing for POST and PUT requests
const app = express();
app.use(bodyParser.json());

// enable .env in dev mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// enable cors for client site
app.use(cors());

// db connection
mongoose
  .connect(process.env.DATABASE_URL, {})
  .then((res) => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Connection Error: ' + err);
  });
// controller reference
const employers = require('./controllers/employers');
app.use('/api/employers', employers);

// route all http requests to our single page index.html from the angular bundle we copied in
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// upload files to server
app.use('/api', fileUpload(), require('./uploadRouter'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/videos', express.static(__dirname + '/videos'));
app.use('/pdfs', express.static(__dirname + '/pdfs'));
// start server & make public
//app.listen(3000)
const port = process.env.PORT || 3000;
app.listen(port);

module.exports = app;
