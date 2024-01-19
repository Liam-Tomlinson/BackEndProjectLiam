const { fetchPatchArticles } = require('../Models/patch.articles.models')

exports.patchArticles = (req, res) => 
{   
    const { inc_votes } = req.body
    const { article_id } = req.params

    fetchPatchArticles(article_id, inc_votes).then((updatedComment) => 
    {
        res.status(200).send(updatedComment)
    }).catch((err) => 
    {
        if(err === 'status: 404, article does not exist')
        {
            res.status(404).send(err)
        }
        if(err === 'status: 400, incorrect vote information given')
        {
            res.status(400).send(err)
        }

    })
}