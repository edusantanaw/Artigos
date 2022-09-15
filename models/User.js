const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const User = new mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        admin : {
            type: Boolean,
            default: false
        }
    })
)

module.exports = User