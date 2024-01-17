const db = require('../db/connection')

exports.fetchArticles = (req) => {

    const articlesId = req.params.article_ID

    return db.query(`SELECT * FROM articles WHERE article_id=${articlesId}`).then(({rows}) =>{
        
        if(rows.length === 0)
        {
            return Promise.reject('Status: 404, endpoint not found')
        }

        return rows
    })
}
