const router = require('express').Router()
const verifyToken = require('../helper/verify-token')
const createUser = require('../Controllers/user/createUser')
const updateUser = require('../Controllers/user/updateUser')
const login = require('../Controllers/user/login')
const {getAllUsers, getUserByID} = require('../Controllers/user/getUsers')
const getAdminByToken = require('../admin/admin')

// User Routes
router.post('/login', login)
router.post('/createAccount', createUser)
router.get('/', getAdminByToken, getAllUsers)
router.put('/editPassword/:id', updateUser.editPassword)
router.put('/editEmail/:id',verifyToken, updateUser.editEmailAndName )
router.delete('/deleteUser/:id',getAdminByToken, updateUser.removeUser)
router.put('/edit/:id',getAdminByToken, updateUser.editUser)
router.get('/getUser/:id', getAdminByToken, getUserByID)

module.exports = router