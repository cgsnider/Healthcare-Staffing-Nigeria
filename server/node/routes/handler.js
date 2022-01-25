const express = require('express');
const router = express.Router();

const auth = require('../auth/auth.js');
const authenticate = auth.authenticateToken

router.use(express.urlencoded({extended: false}));

router.get('/jobs', authenticate, (req, res) => {
    const str = [{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Lagos, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Neurologists" ,
        "location":"Kano, Nigeria",
        "shifts":"10 Hour Shifts",
        "salary":"$80,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Ibadan, Nigeria",
        "shifts":"5 Hour Shifts",
        "salary":"$40,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Pediatricians" ,
        "location":"Benin City, Nigeria",
        "shifts":"7 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Geriatric" ,
        "location":"Port Harcourt, Nigeria",
        "shifts":"8 Hour Shifts",
        "salary":"$100,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Allergists" ,
        "location":"Jos, Nigeria",
        "shifts":"9 Hour Shifts",
        "salary":"$20,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Dermatologists" ,
        "location":"Ilorin, Nigeria",
        "shifts":"10 Hour Shifts",
        "salary":"$10,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Pediatricians" ,
        "location":"Abuja, Nigeria",
        "shifts":"13 Hour Shifts",
        "salary":"$80,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Ophthalmologists" ,
        "location":"Kaduna, Nigeria",
        "shifts":"14 Hour Shifts",
        "salary":"$50,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Obstetrician" ,
        "location":"Enugu, Nigeria",
        "shifts":"11 Hour Shifts",
        "salary":"$70,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Endocrinologists" ,
        "location":"Zaria, Nigeria",
        "shifts":"5 Hour Shifts",
        "salary":"$120,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Pediatricians" ,
        "location":"Benin City, Nigeria",
        "shifts":"7 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Geriatric" ,
        "location":"Port Harcourt, Nigeria",
        "shifts":"8 Hour Shifts",
        "salary":"$100,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Allergists" ,
        "location":"Jos, Nigeria",
        "shifts":"9 Hour Shifts",
        "salary":"$20,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Dermatologists" ,
        "location":"Ilorin, Nigeria",
        "shifts":"10 Hour Shifts",
        "salary":"$10,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Pediatricians" ,
        "location":"Abuja, Nigeria",
        "shifts":"13 Hour Shifts",
        "salary":"$80,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Ophthalmologists" ,
        "location":"Kaduna, Nigeria",
        "shifts":"14 Hour Shifts",
        "salary":"$50,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Obstetrician" ,
        "location":"Enugu, Nigeria",
        "shifts":"11 Hour Shifts",
        "salary":"$70,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Endocrinologists" ,
        "location":"Zaria, Nigeria",
        "shifts":"5 Hour Shifts",
        "salary":"$120,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Pediatricians" ,
        "location":"Benin City, Nigeria",
        "shifts":"7 Hour Shifts",
        "salary":"$90,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Geriatric" ,
        "location":"Port Harcourt, Nigeria",
        "shifts":"8 Hour Shifts",
        "salary":"$100,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Allergists" ,
        "location":"Jos, Nigeria",
        "shifts":"9 Hour Shifts",
        "salary":"$20,000"
    },
    {
        "image":'resources/cmg_logo.png',
        "position":"Dermatologists" ,
        "location":"Ilorin, Nigeria",
        "shifts":"10 Hour Shifts",
        "salary":"$10,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Pediatricians" ,
        "location":"Abuja, Nigeria",
        "shifts":"13 Hour Shifts",
        "salary":"$80,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Ophthalmologists" ,
        "location":"Kaduna, Nigeria",
        "shifts":"14 Hour Shifts",
        "salary":"$50,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Obstetrician" ,
        "location":"Enugu, Nigeria",
        "shifts":"11 Hour Shifts",
        "salary":"$70,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Endocrinologists" ,
        "location":"Zaria, Nigeria",
        "shifts":"5 Hour Shifts",
        "salary":"$120,000"
    }];

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