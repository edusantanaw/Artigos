const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { existsOrError, equalsOrError, validEmail } = require('../../helper/validations')
const createUserToken = require('../../helper/create-user-token')


const register = async (req, res) => {
    const { name, email, password, confirmPassword, admin } = req.body

    try {
        //validations
        existsOrError(name, 'O nome é obrigatorio!')
        existsOrError(email, 'O email é obrigatorio!')
        existsOrError(password, 'A senha é obrigatorio!')
        existsOrError(confirmPassword, 'A confirmação de senha é obrigatoria!')
        equalsOrError(password, confirmPassword, 'Confirmação de senha invalida!')
        validEmail(email, 'Email invalido!')

        const userExists = await User.findOne({ email: email })

        if (userExists) {
            let msg = 'Usuario já cadastrado!'
            throw msg
        }

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user
        const user = new User({
            name: name,
            email: email,
            password: passwordHash,
            admin
        })
        const newUser = await user.save()
        createUserToken(newUser, req, res)

    } catch (msg) {
        res.status(422).json(msg)
    }
}

module.exports = register