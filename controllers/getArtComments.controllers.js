const { fetchArticleComments } = require('../Models/getArtComments.models')
const db = require('../db/connection')


exports.getArticleComments = (req, res) => 
{
    fetchArticleComments(req).then((data) =>
    {
        res.status(200).send({ data })
    }).catch(({ err }) => 
    {
        res.status(404).send()
    })
}