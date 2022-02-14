const mysql = require('mysql2');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root1',
    password: '',
    database: 'cmg_staffing_nigeria'
})

db.connect(error => {
    if (!error) {
        console.log('Database is Connected!');
    } else {
        console.log('Error connecting to mySQL DB')
        throw error;
    }
})

module.exports = db