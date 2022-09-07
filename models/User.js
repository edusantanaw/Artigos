const mongoose = require('../db/db')
const { Schema } = require('mongoose')

const User = new mongoose.model(
    'User',
    new Schema({
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        admin : {
            type: Boolean,
            default: false
        }
    })
)

module.exports = User