const mysql = require('mysql2/promise');



const promised_connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cmg_staffing_nigeria'
    });


    // .then(res => console.log('Database is Connected!'))
    // .catch(err => console.log('Error connecting to mySQL DB'));

// db.connect(error => {
//     if (!error) {
//         console.log('Database is Connected!');
//     } else {
//         console.log('Error connecting to mySQL DB')
//         throw error;
//     }
// })

/**
 * Makes a query call to the data base.
 * @param {string} procedure the sql procedure to be run
 * @param {list} params the parameters to be passed into the sql query
 * @returns 
 */
async function call (procedure="", params=[]) {
    const db = await promised_connection;
    return new Promise((resolve, reject) => {
        
        let sql = "CALL " + procedure + "( ";
        params.forEach(p => {
            if (typeof(p) == 'string') {
                sql += `'${p}', `
            } else if (typeof(p) == 'number' || typeof(p) == 'boolean') {
                sql += `${p}, `
            } else {
                sql += 'null, '
            }

        });
        if (params.length > 0)
            sql = ql.slice(0, sql.length - 2);
        sql += ");"

        console.log("DB Query: ", sql)
        
        db.query(sql)
            .then(result => {
                console.log(result)
                resolve(result)})
            .catch(err => reject(err))
    });
}


async function handleNewUser (req, res, next) {
    const db = await promised_connection;
    const sql = `CALL user_exists('${req.user.email}')`
    db.query(sql)
        .then(results => {
            if (results[0][0].Status === -1){
                addNewUser(req.user)
                    .then(res => next())
                    .catch(err => next());
            } else {
                next();
            }
        })
        .catch(err => console.log('DB FAILURE'))
}

async function addNewUser(user) {
    const db = await promised_connection;
    return new Promise((resolve, reject) => {
        console.log("ADD NEW USER", user)
        let sql;
        
        if (user['custom:type'] == 'Professional') {

            fullName = user.name.split("$")
            sql = `call cmg_staffing_nigeria.register_professional('${fullName[0]}', '${fullName[1]}', '${user.email}');`
        } else if (user['custom:type'] == 'Facility') {
            sql = `CALL register_facility('${user.name}', '${user.email}')`
        } else if (user['custom:type'] == 'Admin') {
            sql = `CALL admin_create_admin('${user.email}')`
        }

        db.query(sql)
            .then(results => resolve(results))
            .catch(err => reject(err));
            
    });
}




// module.exports = db;
module.exports.call = call;
module.exports.handleNewUser = handleNewUser;