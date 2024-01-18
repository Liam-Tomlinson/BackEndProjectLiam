const { fetchArticleComments } = require('../Models/getArtComments.models')
const db = require('../db/connection')


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