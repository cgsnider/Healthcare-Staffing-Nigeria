const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const PORT = 4000;

// Sets up express routing

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', routesHandler);

// Connects app to mysql database
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cmg_staffing_nigeria'
})

db.connect(error => {
    if (!error) {
        console.log('Connected');
    } else {
        console.log('Error connecting to mySQL DB')
    }
})

// Connects app to port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

