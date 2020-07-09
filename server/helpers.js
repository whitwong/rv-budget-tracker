'use strict';

// Format and clean up data for API endpoints
const formatData = ( data ) => {
  let cleanData = [];
  data.map(d => {
    cleanData.push({
      purchase_date: d.purchase_date.toISOString().split('T')[0],
      purchase_details: d.purchase_details,
      location: d.location,
      cost: parseFloat(d.cost),
      purchaser: d.purchaser,
      category: d.category
    })
  })
  return cleanData
}

module.exports = {
  formatData
}