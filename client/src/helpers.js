/**  Helper file for client functions used multiple times in project **/

module.exports = {
  // Format currency to USD ($10.23)
  formatCurrency: ( value ) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}