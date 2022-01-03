const express = require('express');
const router = express.Router();

router.get('/jobs', (req, res) => {
    const str = [{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    },{
        "image":'resources/cmg_logo.png',
        "position":"Cardiologist" ,
        "location":"Generic, Nigeria",
        "shifts":"12 Hour Shifts",
        "salary":"$90,000"
    }];

    res.end(JSON.stringify(str));
})

module.exports = router;