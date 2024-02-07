const db = require('../db/connection')

exports.fetchPatchArticles = (article_id, inc_votes) => 
{
    if(inc_votes === undefined)
    {
        return Promise.reject('status: 400, incorrect vote information given')
    }
    return db.query('SELECT * FROM articles WHERE article_id=$1', [article_id]).then(({rows}) => {

        if(rows.length === 0)
        {
            return Promise.reject('status: 404, article does not exist');

        }
       
        const newVotes = rows[0].votes + inc_votes
        return db.query('UPDATE articles SET votes=$1 WHERE article_id=$2 RETURNING *', [inc_votes, article_id]).then(({rows}) => {
            return rows
        })      
    })
}