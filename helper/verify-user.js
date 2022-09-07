const getToken = require('./get-token')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userEqualsOrError = async (req, value, msg) => {

    const token = getToken(req)
    const decoded = jwt.verify(token, 'edusantanaw')
    const userId = decoded.id

    const user = await User.findOne({_id: userId})
    const admin  = user.admin

    if (userId !== value || admin ) {
        throw msg
    }

}

module.exports = userEqualsOrError