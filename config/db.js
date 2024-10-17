const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'user',
  password: 'user_password',
  database: 'vnxdb_chatbot'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = db;