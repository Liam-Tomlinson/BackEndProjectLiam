const db = require('../db/connection')


exports.fetchPostComments = (username, body, article_id) => 
{
    if(body === undefined || username === undefined)
        {
            return Promise.reject('status: 400, missing content')
        }

    return db.query('SELECT * FROM articles WHERE article_id=$1', [article_id]).then(({rows}) => {
        
        if(rows.length === 0)
        {
            return Promise.reject('status: 404, article does not exisit')
        }
        return db.query('SELECT * FROM users WHERE username=$1', [username]).then(({rows}) => {
            if(rows.length === 0)
            {
                return Promise.reject('status: 404, username does not exisit')
            }
            return db.query(`INSERT INTO comments (body, author, article_id, votes) VALUES ($1, $2, $3, 0) RETURNING *`, [body, username, article_id]).then(({rows}) => 
            {
                return rows
            })
        })
       
    })
}