const express = require("express")
const { getTopics, getApiInfo } = require('./controllers/topics.controllers')


const app = express();

//app.use(express.json())

//app.get always referecnes the controller.   
app.get("/api/topics", getTopics);

app.get("/api", getApiInfo);

  module.exports = { app };