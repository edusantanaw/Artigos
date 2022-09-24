const jwt = require('jsonwebtoken')

const createUserToken = (user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "edusantanaw")

    res.status(200).json({
        message: 'usuario autenticado!',
        token: token,
        user: user,
        userId: user._id
    })
}

module.exports = createUserToken