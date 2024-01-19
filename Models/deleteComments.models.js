const promise = require('seed/lib/seed/base/promise')
const db = require('../db/connection')

exports.fetchDeleteComments = (comment_id) =>
{
    return db.query('SELECT * FROM comments WHERE comment_id=$1', [comment_id]).then(({rows}) => 
    {
        if(rows.length === 0)
        {
            return Promise.reject('status: 404, comment does not exist')
        }
        return db.query('DELETE FROM comments WHERE comment_id=$1 RETURNING *', [comment_id]).then(({rows}) => 
        {
            return rows
        })
    })
}