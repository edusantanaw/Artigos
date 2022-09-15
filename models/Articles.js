const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const Article = new mongoose.model(
    'Article',
    new Schema({
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        summary:{
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        user: Object
    })
)

module.exports = Article