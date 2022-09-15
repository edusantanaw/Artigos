const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const Categories = new mongoose.model(
    'Categories',
    new Schema({
        name: {
            type: String,
            required: true
        },
        img:{
            type: Object
        },
        totArticles: {
            type: Number
        }
    })
)

module.exports = Categories