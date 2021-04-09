'use strict';

const connectionString = require('../config').connectionString;
const { Client } = require('pg');

// *** Connect to Database *** //
const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

client.connect();

module.exports = {
  // Query db for totals for all categories
  getCategoryTotals: ( req, res ) =>  {
    console.log('getCategoryTotals endpoint');

    client
      .query(`select 
                category, 
                sum(cost) as total 
              from expenses 
              where category in('Maintenance_Repair', 'Gas', 'Propane', 'Parking_Toll', 'InitialCosts', 'RigUpgrades', 'InternationalCashExchange', 'Entertainment', 'Food', 'Internet', 'Rent')
              group by category;`)
      .then(data => {
        let cleanData = [];
        data.rows.map(d => {
          cleanData.push({
            // To help make Landing Page labels on Travel Cost pie chart look better, modifying returned category names for Maintenance_Repair and RigUpgrades
            category: d.category === 'Maintenance_Repair' ? 'Maintenance' : d.category === 'RigUpgrades' ? 'Rig' : d.category,
            total: parseFloat(d.total)
          })
        })
        
        return cleanData;
      })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(404).send(err);
      })
  },

  // Query db for total overall expenses
  getOverallExpenseTotal: ( req, res ) => {
    console.log('getOverallExpenseTotal endpoint');

    client
      .query(`select 
                sum(cost) as total 
                from expenses
                where category in('Maintenance_Repair', 'Gas', 'Propane', 'Parking_Toll', 'InitialCosts', 'RigUpgrades', 'InternationalCashExchange', 'Entertainment', 'Food', 'Internet', 'Rent');`)
      .then(data => {
        res.status(200).send(data.rows);
      })
      .catch(err => {
        res.status(404).send(err);
      })
  },

  // Query db for initial costs
  getInitialCost: ( req, res ) => {
    console.log('getInitialCost endpoint');

    client
      .query(
        `select 
          category,
          sum(cost) as total 
        from expenses 
        where category = 'InitialCosts'
        group by category;`)
      .then(data => {
        res.status(200).send(data.rows)
      })
      .catch(err => {
        res.status(404).send(err);
      })
  }
}