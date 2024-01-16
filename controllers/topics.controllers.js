const { fetchTopics} = require('../Models/topics.models')



exports.getTopics = (req, res) => {
    fetchTopics().then((data) => res.status(200).send({ data }))

};






