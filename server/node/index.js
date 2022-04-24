require('dotenv').config('./.env')
const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');
const process = require('process');

const PORT = process.env.PORT;

// Sets up express routing

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', routesHandler);

// Connects app to port

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

