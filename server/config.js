module.exports = {
  connectionString: process.env.DATABASE_URL || 'postgres://whitneywong@localhost:5432/rv',
  url: process.env.URI || 'http://localhost:3001',
};