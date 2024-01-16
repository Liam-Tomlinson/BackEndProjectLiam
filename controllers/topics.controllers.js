const { fetchTopics, fetchApiInfo } = require('../Models/topics.models')
const endPoints = require('../endpoints.json')


exports.getTopics = (req, res) => {
    fetchTopics().then((data) => res.status(200).send({ data }))

};

exports.getApiInfo = (req, res) => {
    res.status(200).send(endPoints)
}




