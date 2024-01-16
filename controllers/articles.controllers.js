const { fetchArticles } = require('../Models/articles.models')
const db = require('../db/connection')


exports.getArticles = (req, res) => {

        fetchArticles(req).then((data) => {

            if(data.length === 0)
            {
                res.status(404).send()
            }
            else
            {
                res.status(200).send({ data })
            }
         }) 
};