const { PostComments } = require('../Models/postComments.models')


exports.postComments = (req, res) =>
{
    const { username, body } = req.body
    const { article_id} = req.params

    PostComments(username, body, article_id).then((newComment) =>
    {
        res.status(201).send(newComment)
    }).catch((err) => {

        if(err === 'status: 404, article does not exisit' || err === 'status: 404, username does not exisit')
        {
            res.status(404).send(err)
        }
        if(err === 'status: 400, missing content')
        {
            res.status(400).send(err)
        }
    })
}