const express = require("express")
const { getTopics } = require('./controllers/topics.controllers')
const { getApiInfo } = require('./controllers/api.controllers')
const { getArticles } = require('./controllers/articles.controllers')
const { getAllArticles } = require('./controllers/articles5.controllers')


const app = express();

//app.use(express.json())

//app.get always referecnes the controller.   
app.get("/api/topics", getTopics);

app.get("/api", getApiInfo);

app.get(`/api/articles/:article_ID`, getArticles);

app.get('/api/articles', getAllArticles);

app.all('*', (req, res) => {res.status(404).send()})


  module.exports = { app };