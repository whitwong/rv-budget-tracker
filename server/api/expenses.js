'use strict';

const connectionString = require('../config').connectionString;
const { Client } = require('pg');
const month = require('../config').date;

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
function getExpenseCategory(req, res) {
  client
    .query('SELECT * from expenses where category = $1 order by purchase_date asc;', [req.params.category])
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      res.status(404).send(err);
    }) 
};

// GET route to query for all expenses of a specified month
function getExpenseMonthly(req, res) {
  const selectedMonth = req.params.month;

  if (selectedMonth !== 'December'){
    client
      .query(`SELECT * from expenses where purchase_date >= '2019-${month[selectedMonth]}-01' and purchase_date < '2019-${month[selectedMonth]+1}-01' order by purchase_date asc;`)
      .then(data => {
        res.status(200).send(data.rows);
      })
      .catch(err => {
        res.status(404).send(err);
      })
  }
  else {
    client
      .query(`SELECT * from expenses where (purchase_date >= '2019-12-01' and purchase_date < '2019-12-31' OR purchase_date >= '2018-12-01' and purchase_date < '2018-12-31') order by purchase_date asc;`)
      .then(data => {
        res.status(200).send(data.rows);
      })
      .catch(err => {
        res.status(404).send(err);
      })
  }
}


module.exports = {
  getCategories,
  getExpenseCategory,
  getExpenseMonthly
};