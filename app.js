const express = require("express")
const { getTopics } = require('./controllers/topics.controllers')
const { getApiInfo } = require('./controllers/api.controllers')
const { getArticles } = require('./controllers/articles.controllers')
const { getAllArticles } = require('./controllers/articles5.controllers')
const { getArticleComments } = require('./controllers/getArtComments.controllers') 
const { postComments } = require('./controllers/postComments.controllers')
const { patchArticles } = require('./controllers/patch.articles.controllers')
const { deleteComments } = require('./controllers/deleteComments.controllers')
const { getAllUsers } = require('./controllers/getUsers.controllers')
const cors = require('cors')

app.use(cors())

const app = express();

app.use(express.json())

//app.get always referecnes the controller.   
app.get("/api/topics", getTopics);

app.get("/api", getApiInfo);

app.get(`/api/articles/:article_ID`, getArticles);

app.get('/api/articles', getAllArticles);

app.get('/api/articles/:article_id/comments', getArticleComments);

app.post('/api/articles/:article_id/comments', postComments);

app.patch('/api/articles/:article_id', patchArticles);

app.delete('/api/comments/:comment_id', deleteComments);

app.get("/api/users", getAllUsers);

app.all('*', (req, res) => {res.status(404).send()});


  module.exports = { app };