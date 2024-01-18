const { fetchAllArticles } = require('../Models/articles5.models')


exports.getAllArticles = (req, res) => 
{
    fetchAllArticles().then((data) =>
    {
      
        res.status(200).send({ data })
    })
}