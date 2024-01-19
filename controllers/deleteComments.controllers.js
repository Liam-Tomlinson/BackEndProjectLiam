const { fetchDeleteComments } = require('../Models/deleteComments.models')

exports.deleteComments = (req, res) => 
{
    const { comment_id } = req.params

    return fetchDeleteComments(comment_id).then((deletedComment) => 
    {
        res.status(204).send(deletedComment)
        
    }).catch((err) => 
    {
        res.status(404).send(err)
    })
}