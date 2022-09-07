const router = require('express').Router()
const createUser = require('../Api/user/createUser')
const updateUser = require('../Api/user/updateUser')
const login = require('../Api/user/login')
const {getAllUsers, getUserByID} = require('../Api/user/getUsers')
const createArticle = require('../Api/Articles/createArticle')
const verifyToken = require('../helper/verify-token')
const { getArticles, getArticlesById } = require('../Api/Articles/getArticles')
const editArticle = require('../Api/Articles/editArticles')
const removeArticleById = require('../Api/Articles/removeArticle')
const removeCategory = require('../Api/Articles/removeCategory')
const getAdminByToken = require('../admin/admin')

// User Routes
router.post('/login', login)
router.post('/createAccount', createUser)
router.get('/user', getAdminByToken, getAllUsers)
router.put('/user/editPassword/:id', updateUser.editPassword)
router.put('/user/editEmail/:id',verifyToken, updateUser.editEmailAndName )
router.delete('user/deleteUser/:id',getAdminByToken, updateUser.removeUser)
router.put('/edit/:id',getAdminByToken, updateUser.editUser)
router.get('/user/:id', getAdminByToken, getUserByID)

// Article routes
router.get('/articles', getArticles)
router.post('/articles/newArticle', verifyToken, createArticle)
router.put('/articles/edit/:id', verifyToken, editArticle)
router.delete('/articles/deleteCategory', getAdminByToken, removeCategory)
router.delete('/articles/delete/:id', verifyToken, removeArticleById)
router.get('/articles/:id', verifyToken, getArticlesById)

module.exports = router