const express = require('express');
const bodyParser = require('body-parser');
const routesHandler = require('./routes/handler.js');

const PORT = 4000;

// Sets up express routing

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', routesHandler);

// Connects app to port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

