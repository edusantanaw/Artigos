const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const Article = new mongoose.model(
    'Article',
    new Schema({
        category: {
            type: String,
        },
        title: {
            type: String,
        },
        content: {
            type: String,
        },
        user: Object
    })
)

module.exports = Article