const mongoose = require('mongoose')

let Schema = mongoose.Schema

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: '・'
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo