const jwt = require('jsonwebtoken')
const getToken = require('../../helper/get-token')
const User = require('../../models/User')

const checkUser = async (req, res) => {
    let currentUser

    if (req.headers.authorization) {
        const token = getToken(req)
        
        const decoded = jwt.verify(token, 'edusantanaw')

        currentUser = await User.findById(decoded.id)

        currentUser.password = undefined
    } else {
        currentUser = null
    }
    res.status(200).send(currentUser)
}

module.exports = checkUser