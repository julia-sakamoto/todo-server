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
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

//Root directory
app.get('/', function(req, res) {
  res.json('success')
})

//Get all
app.get('/api/todos', function (req, res) {
  Todo.find({}).then((todoItem) => {
    res.json(todoItem)
  })
})

//Post new todo
app.post('/api/todos', function (req, res) {
  Todo.create({title: req.body}, function (err, item) {
    if (err)
      return next(err)
    res.json(item)
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