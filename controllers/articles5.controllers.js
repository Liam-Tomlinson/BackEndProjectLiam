const { fetchAllArticles } = require('../Models/articles5.models')
const db = require('../db/connection')

exports.getAllArticles = (req, res) => 
{
    fetchAllArticles().then((data) =>
    {
      
        res.status(200).send({ data })
    })
}