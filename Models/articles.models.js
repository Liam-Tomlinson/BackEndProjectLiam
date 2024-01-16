const db = require('../db/connection')

exports.fetchArticles = (req) => {
    const articlesId = req.params.article_ID
    return db.query(`SELECT * FROM articles WHERE article_id=${articlesId}`).then(({rows}) =>{
        
        return rows
    })
}

