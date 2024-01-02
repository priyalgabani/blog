const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    comments: [{
        text: String,
        username: String,
        date: { type: Date, default: Date.now }
    }]
})

let articaldata = mongoose.model("articaldata", blogSchema)

module.exports = articaldata