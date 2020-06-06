module.exports = {
  connectionString: process.env.DATABASE_URL || 'postgres://whitneywong@localhost:5432/rv',
  url: process.env.URI || 'http://localhost:3001',
  date: {"January": 1, "February": 2, "March": 3, "April": 4, "May": 5, "June": 6, "July": 7, "August": 8, "September": 9, "October": 10, "November": 11, "December": 12}
};