const mysql = require('mysql2');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
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


function handleNewUser (req, res, next) {

    const sql = `CALL user_exists('${req.user.email}')`
    db.query(sql, (err, results) => {
        if (err) console.log('DB FAILURE')
        else if (results[0][0].Status === -1){

            addNewUser(req.user)
                .then(res => next())
                .catch(err => next())
        } else {
            next()
        }
    })

}

function addNewUser(user) {
    return new Promise((resolve, reject) => {
        
        let sql;
        
        if (user['custom:type'] == 'Professional') {

            fullName = user.name.split("$")
            sql = `call cmg_staffing_nigeria.register_professional('${fullName[0]}', '${fullName[1]}', '${user.email}');`
        } else {
            sql = `CALL register_facility('${user.name}', '${user.email}')`
        }

        db.query(sql, (err, results) => {
            if (err) reject(results);
            resolve(results);
        })
    });
}

// function call_proceedure(proceedure, params) {
//     return new Promise((resolve, reject) => {
//         sql_query = "(";
//         params.forEach(p => sql_query += (typeof p == 'string') ? `'${p}', ` : `${p}, `);
//         sql_query = "CALL "  + proceedure + params + ");"
//         await db.query(sql)
//         .then(results => resolve(results))
//         .catch(err => reject(err))
//     });
// }



module.exports = db;
module.exports.handleNewUser = handleNewUser;