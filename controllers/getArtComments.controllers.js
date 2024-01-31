const { fetchArticleComments } = require('../Models/getArtComments.models')



exports.getArticleComments = (req, res) => 
{
    fetchArticleComments(req).then((comments) =>
    {
        res.status(200).send({ comments })
    }).catch(({ err }) => 
    {
        res.status(404).send(err)
    })
}