const db = require('../db/connection')

exports.fetchAllArticles = () => 
{
    return db.query('SELECT * FROM articles ORDER BY created_at').then(({rows}) => {
        return db.query('SELECT * FROM comments').then((coms) => {
            let comments = coms.rows
            for(let i = 0; i < rows.length; i++)
            {
                rows[i].comment_count = 0
                delete rows[i].body

                for(let j = 0; j < comments.length; j++)
                {
                  if(comments[j].article_id === rows[i].article_id)
                  {
                    rows[i].comment_count++ 
                  }
                }
            }
            
            return rows
        })
    })
}