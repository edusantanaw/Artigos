const ObjectId = require('mongoose').Types.ObjectId

const verifyId = (id, msg) => {
    if (!ObjectId.isValid(id)) throw msg
}

module.exports = verifyId