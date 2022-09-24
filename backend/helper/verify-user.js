const getToken = require('./get-token')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Article = require('../models/Articles') 

const userEqualsOrError = async (req, res, next ) => {

    const token = getToken(req)
    const decoded = jwt.verify(token, 'edusantanaw')
    const userId = decoded.id
    const articleId = req.params.id
    const user = await User.findOne({_id: userId})
    const article = await Article.findOne({_id: articleId})
    const id = article.user._id
    const admin  = user.admin

    try{
        if (userId === id || admin ){
            next()
        }
    }catch(err){
        return
    }
}

module.exports = userEqualsOrError