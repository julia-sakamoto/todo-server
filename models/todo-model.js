const mongoose = require('mongoose')

let Schema = mongoose.Schema

const todoSchema = new Schema({
  status: {
    type: String,
    default: '・'
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo