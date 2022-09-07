const getToken = require('../helper/get-token')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getAdminByToken = async (req, res, next) => {
    
    const token = getToken(req)
    if (!token)  return res.status(401).send('Acesso negado!')
    
    const decoded = jwt.verify(token, 'edusantanaw')
    const userId = decoded.id
    const user = await User.findOne({ _id: userId })
    const admin = user.admin
    try {
        if (admin !== true) {
            let msg = 'Acesso negado!'
            throw msg
        }
        next()

    } catch (msg) {
        res.status(401).send(msg)
    }

    return

}

module.exports = getAdminByToken
