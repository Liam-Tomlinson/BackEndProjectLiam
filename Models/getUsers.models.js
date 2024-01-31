const db = require('../db/connection')

exports.getUsers = () =>
{
    return db.query('SELECT * FROM users').then((userRows) => {

        if(userRows.rows.length === 0)
        {
            return Promise.reject('status: 404, no users exist')
        }
        return userRows.rows
    })
}