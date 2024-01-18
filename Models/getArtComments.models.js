const db = require('../db/connection')


exports.fetchArticleComments = (req) => 
{

    const articlesId = req.params.article_id


    return db.query(`SELECT * FROM articles WHERE article_id=$1`, [articlesId]).then((articleRows) => {

        if(articleRows.rows.length === 0)
        {
            return Promise.reject('status: 404, endpoint not found')

        }
        return db.query(`SELECT * FROM comments WHERE article_id=$1 ORDER BY created_at DESC`, [articlesId]).then((rows) =>{
            return rows.rows
        })
    })
}