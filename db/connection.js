const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'employee'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
});

module.exports = db;