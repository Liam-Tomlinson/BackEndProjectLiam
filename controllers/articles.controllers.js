const { fetchArticles } = require('../Models/articles.models')
const db = require('../db/connection')


exports.getArticles = (req, res) => {

        fetchArticles(req).then((data) => {

           
            
             res.status(200).send({ data })
        
         }).catch((data) => {
            
            if(data = 'Status: 404, endpoint not found')
            {
                res.status(404).send({ data })
            }
            // if(data = 'Status: 400, bad request, please enter number')
            // {
            //     res.status(400).send({ data })
            // }
         }) 
};




