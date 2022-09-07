const checkExists = require('../../helper/check-exists')
const verifyId = require('../../helper/verifyId')
const User = require('../../models/User')


    const getAllUsers = async (req, res )=> {
        try {
            const user = await User.find()
            checkExists(user, 'Nenhum usuario encontrado!')

            res.json(user)

        } catch (msg) {
            res.json(msg)
        }
    }

    const getUserByID = async (req, res)=> {
        const id = req.params.id

        try {
            verifyId(id, 'O id é Invalido')
            const user = await User.findOne({ _id: id })
            checkExists(user, 'Usuario não encontrado!')
   
            res.json({ user })

        } catch (msg) {
            res.status(400).json(msg)
        }
    }


module.exports = {getAllUsers, getUserByID}