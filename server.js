const express = require('express')
const parseurl = require('parseurl')
const bodyParser = require('body-parser')
const path = require('path')
const expressValidator = require('express-validator')
const mongoose = require('mongoose')
const Todo = require('./models/todo-model.js')
const app = express()
const url = 'mongodb://user:passw0rd@ds023303.mlab.com:23303/todolist'

//CORS error fix
function CORSheaders(res) {
  res.header("Access-Control-Allow-Headers", "*")
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
}

//Root directory
app.get('/', function(req, res) {
  res.header("Access-Control-Allow-Headers", "*")
  res.json('success')
})

//Get all
app.get('/api/todos', function(req, res) {
  CORSheaders(res)

  Todo.find({}).then((todoItem) => {
    res.json(todoItem)
  })
})

//Post new signature
app.post('/api/todos', function(req, res) {
  CORSheaders(res)

  Todo.create({
    title: req.body.Title
  }).then(todoItem => {
    res.json(todoItem)
  })
})

//Mongoose connect
mongoose.connect(url, function(err, db) {
  if (err)
    console.log('Unable to connect. Error: ', err)
  else
    console.log('Connection established with ', url)
})

//Use bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000
app.listen(port)