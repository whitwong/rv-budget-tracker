const express = require('express');
const path = require('path');
const app = express();
const port = process.env.port || 3001;

/* Include Middleware to read/return request body values*/
const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files from the React app
// ******* Probably need to change for production build *****
app.use(express.static(path.join(__dirname, 'client/build'))); 

/** API Routes **/ 
// General ping routes
// app.get('/', require('./server/api/general').init);
// app.get('/ping', require('./server/api/general').ping);
//Quick check that backend is up
app.get('/', (req, res) => {
  res.status(200).send("OK");
  console.log("sending ok message")
});

app.get('/ping', (req, res) => {
  res.status(200).send('Ping OK');
  console.log("pinging")
});

// // GET and POST routes for expenses
// app.get('/getExpense/:category', require('./server/api/expenses').getExpense);
// app.get('/getCategories', require('./server/api/expenses').getCategories);

// A "catchall" handler for any request that doesn't match one above. Send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

//Port listener
app.listen(port);
console.log(`RV Budget Tracker listening on port ${port}`);