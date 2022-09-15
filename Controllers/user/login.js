const User = require('../../models/User')
const bcrypt = require('bcrypt')
const createUserToken = require('../../helper/create-user-token')
const { existsOrError } = require('../../helper/validations')
const checkExists = require('../../helper/check-exists')

const login = async (req, res) => {

    const { email, password } = req.body

    try {
        existsOrError(email, 'Email inválido!')
        const user = await User.findOne({ email: email })
        checkExists(user, 'Usuario não encontrado!')
        existsOrError(password, 'Senha inválida!')

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            let msg = 'Emai/senha invalidos!'
            throw msg
        }
        
        createUserToken(user, req, res)

    } catch (msg) {
        res.status(400).send(msg)
    }
}

module.exports = login
