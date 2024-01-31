const { getUsers } = require('../Models/getUsers.models')


exports.getAllUsers = (req, res) => 
{
    getUsers().then((users) => {
        res.status(200).send({ users })
    }).catch(({ err }) => {
        res.status(404).send(err)
    })
}