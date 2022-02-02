const express = require('express');
const router = express.Router();

const auth = require('../auth/auth.js');
const authenticate = auth.authenticateToken

router.use(express.urlencoded({extended: false}));

router.get('/jobs', authenticate, (req, res) => {
    const str = [{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist1" ,
        "location":"Generic2, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$80,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic2, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$80,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist3" ,
        "location":"Generic2, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$80,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist3" ,
        "location":"Generic2, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$80,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist1" ,
        "location":"Generic2, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$80,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist2" ,
        "location":"Generic3, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },];

    res.end(JSON.stringify(str));
})

// router.post('/register', (req, res) => {
    
//     const newUser = {
//         email: req.body.email,
//         password: req.body.password,
//         fname: req.body.fname,
//         lname: req.body.lname
//     }

//     if (auth.RegisterUser(newUser)) {
//         console.log('Created User')
//         res.status(201).send('Created User');
//     } else {
//         console.log('Failed to Create user')
//         res.status(200).send('Failed to Create user')
//     }
// })

// router.post('/login', (req, res) => {
//     const {email, password} = req.body;

//     console.log(`email: ${email}, password:${password}`);
//     auth.SignIn({email, password});
//     res.status(200).send("recieved");

// })

module.exports = router;