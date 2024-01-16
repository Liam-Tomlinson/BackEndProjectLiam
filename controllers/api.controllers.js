const endPoints = require('../endpoints.json')

exports.getApiInfo = (req, res) => {
    res.status(200).send(endPoints)
}