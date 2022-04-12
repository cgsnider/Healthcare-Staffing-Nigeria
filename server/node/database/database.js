const mysql = require('mysql2/promise');
const Code = require('../code.js')

const promised_connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'cmg_staffing_nigeria'
    });

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
            sql = sql.slice(0, sql.length - 2);

        sql += ");"

        console.log("call: ", sql)
        
        db.query(sql)
            .then(result => {
                console.log(sql, "\n", result[0])
                resolve(result[0])
            }).catch(err => reject(Code.internal_server_error))
    });
}


async function handleNewUser (req, res, next) {
    const db = await promised_connection;
    console.log("HANDLE NEW USER")
    const sql = `CALL user_exists('${req.user.email}')`
    db.query(sql)
        .then(results => {
            console.log(results[0][0])
            if (results[0][0][0].Exist_Status === -1){
                addNewUser(req.user)
                    .then(res => next())
                    .catch(err => res.status(Code.internal_server_error).end());
            } else {
                console.log('NEXT')
                next();
            }
        })
        .catch(err => res.status(Code.internal_server_error).end())
}

async function addNewUser(user) {
    const db = await promised_connection;
    return new Promise((resolve, reject) => {
        console.log("ADD NEW USER", user)
        let sql;
        
        if (user['custom:type'] == 'Professional') {
            fullName = user.name.split("$")
            sql = `call cmg_staffing_nigeria.register_professional('${fullName[0]}', '${(fullName.length >= 2) ? fullName[1] : 'N/A'}', '${user.email}');`
        } else if (user['custom:type'] == 'Facility') {
            sql = `CALL register_facility('${user.name}', '${user.email}')`
        } else if (user['custom:type'] == 'Admin') {
            sql = `CALL admin_create_admin('${user.email}')`
        }

        db.query(sql)
            .then(results => resolve(results))
            .catch(err => reject(Code.internal_server_error));
            
    });
}


module.exports.call = call;
module.exports.handleNewUser = handleNewUser;