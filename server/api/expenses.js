'use strict';

const connectionString = require('../config').connectionString;
const { Client } = require('pg');
const month = require('../config').date;
const formatData = require('../helpers').formatData;

// *** Connect to Database *** //
const client = new Client({
  connectionString: connectionString,
});

client.connect();

// GET route to find and return all distinct categories
function getCategories(req, res) {
  console.log("getCategories endpoint");

  client
    .query('SELECT distinct category from expenses;')
    .then(data => {
      res.status(200).send(data.rows);
      console.log(`queried for distinct categories and sent to client`);
    })
    .catch(err => {
      res.status(404).send(err);
    })
};

// GET route to find and return all expenses of a specified category
function getExpenseCategory(req, res) {
  console.log("getExpenseCategory endpoint");

  client
    .query('SELECT * from expenses where category = $1 order by purchase_date asc;', [req.params.category])
    .then(data => {
      res.status(200).send(data.rows);
      console.log(`queried category data for ${req.params.category} and sent to client`);
    })
    .catch(err => {
      res.status(404).send(err);
    }) 
};

// GET route to query for all expenses of a specified month and organize data for easy access by client.
// December is unique. Have expenses from Dec 2018 and Dec 2019. Will need to do something special to display this data.
function getExpenseMonthly(req, res) {
  console.log("getExpenseMonthly endpoint");
  
  const selectedMonth = req.params.month;
  const queryString = `SELECT * from expenses where purchase_date >= '2019-${month[selectedMonth]}-01' and purchase_date < '2019-${month[selectedMonth]+1}-01' order by purchase_date asc;`;
  const queryStringDec = `SELECT * from expenses where (purchase_date >= '2019-12-01' and purchase_date < '2019-12-31' OR purchase_date >= '2018-12-01' and purchase_date < '2018-12-31') order by purchase_date asc;`;

  client
    .query(selectedMonth !== 'December' ? queryString : queryStringDec)
    // Format data (ex: purchase_date change from ISOdatetime --> ISOdate, cost change from string --> number)
    .then(data => {
      return formatData(data.rows)
    })
    // Get unique categories to make into keys for new categories object. Push expense items as new values into respective category keys.
    .then(data => {
      const distinctCategories = [...new Set(data.map(cat => cat.category))];
      const categoriesObj = Object.assign({}, ...distinctCategories.map(item => ({[item]: []})))
      data.forEach(element => {
        categoriesObj[element.category].push(element)
      })
      return categoriesObj
    })
    // Create new totalCosts array to hold total expense costs for each category. Keep categories object the same.
    .then(categoriesDetails => {
      let keys = Object.keys(categoriesDetails)
      let totalCosts = [];

      keys.map(key => {
        let total = 0;
        categoriesDetails[key].map(item => {
          total = total + item.cost;
        })
        totalCosts.push({name: key, totalCost: Number(total.toFixed(2))})
      })
      return { totalCosts, categoriesDetails }
    })
    // Send Total Costs and Category Details objects to client
    .then(({ totalCosts, categoriesDetails }) => {
      res.status(200).send({ totalCosts, categoriesDetails });
      console.log(`queried monthly data for ${selectedMonth} and sent to client`)
    })
    .catch(err => {
      res.status(404).send(err);
    })
}


module.exports = {
  getCategories,
  getExpenseCategory,
  getExpenseMonthly
};