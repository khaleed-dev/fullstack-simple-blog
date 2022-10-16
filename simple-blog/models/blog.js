const mongoose = require('mongoose')

// schema is the thing that is going to define the structure of the documents that we are going to store inside a collection. it's the thing that a model wrapps around
const Schema = mongoose.Schema; //mongoose.Schema is a construction function.

const blogScehma = new Schema({ 
    title: {
        type: String,
        required: true

    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true })

// the modal surrounds the schema & provides an interface to communicate a db collection for that document type.

const Blog = mongoose.model('Blog', blogScehma)
module.exports = Blog;
