'use strict';

const connectionString = require('../config').connectionString;
const { Client } = require('pg');

// *** Connect to Database *** //
const client = new Client({
  connectionString: connectionString,
});

client.connect();

// GET route to find and return all distinct categories
function getCategories(req, res) {
  client
    .query('SELECT distinct category from expenses;')
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      res.status(404).send(err);
    })
};

// GET route to find and return all expenses of a specified category
function getExpense(req, res) {
  client
    .query('SELECT * from expenses where category = $1', [req.params.category])
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      res.status(404).send(err)
    }) 
};


module.exports = {
  getCategories,
  getExpense
};