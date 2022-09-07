const checkExists = require('../../helper/check-exists')
const verifyId = require('../../helper/verifyId')
const Articles = require('../../models/Articles')

const getArticles = async (req, res) => {

    const articles = await Articles.find()
    try {
        checkExists(articles, 'Nenhum artigo encontrado!')
        res.json(articles)

    } catch (msg) {
        res.status(400).send(msg)
    }

}

const getArticlesById = async (req, res) => {
    const id = req.params.id

    try {
        verifyId(id, 'ID invalido')
        const article = await Articles.findOne({_id: id})
        
        checkExists(article, 'Nnhum artigo encontrado!')
        res.json(article)

    } catch (msg) {
        res.status(400).send(msg)
    }
}

module.exports = {getArticles, getArticlesById}