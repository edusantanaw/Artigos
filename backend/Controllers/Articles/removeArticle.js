const verifyId = require('../../helper/verifyId')
const Article = require('../../models/Articles')
const checkExists = require('../../helper/check-exists')
const Categories = require('../../models/Category')

const removeArticleById = async (req, res) => {
    const {id} = req.params
    
    try {
        verifyId(id, 'O id é invalido')
        const article = await Article.findOne({ _id: id })
        checkExists(article, 'Artigo não encontrado!')
       
        const categoryId = article.category._id
        const category = await Categories.findOne({_id: categoryId})
        const userId = article.user._id
       
        await Article.findOneAndDelete({_id: id})
        category.totArticles -= 1 
        await Categories.findOneAndUpdate(
            {_id: category._id},
            {$set: category},
            {new: true}
        )
        res.status(200).send('Artigo deletado com sucesso!')

    } catch (msg) {
        res.status(400).send(msg)
    }
    
}

module.exports = removeArticleById