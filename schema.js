const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    }

})

const Todos = mongoose.model('todo', todoSchema)

module.exports = Todos