const mysql = require('mysql2/promise');
const fs = require('fs');
const ini = require('ini');

// Read the configuration file
const configPath = __dirname + '/../config.ini'; // Adjust path if needed
const dbConfig = ini.parse(fs.readFileSync(configPath, 'utf-8')).db_config;

// Create a connection pool
const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  port: dbConfig.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  query: async (sql, params) => {
    const connection = await pool.getConnection();
    try {
      const [results] = await connection.execute(sql, params);
      return results;
    } finally {
      connection.release();
    }
  },
};
