const verifyId = require('../../helper/verifyId')
const Article = require('../../models/Articles')
const { existsOrError } = require('../../helper/validations')
const userEqualsOrError = require('../../helper/verify-user')
const checkExists = require('../../helper/check-exists')

const editArticle = async (req, res) => {

    const id = req.params.id
    const { category, title, content } = req.body

    try {
        verifyId(id, 'Id invalido!')

        const article = await Article.findOne({ _id: id })
        checkExists(article, 'Artigo não  encontrado!')

        const userId = article.user._id
        userEqualsOrError(req, userId, 'Acesso negado!')

        existsOrError(category, ' A categoria é necessario')
        article.category = category

        existsOrError(title, 'O title é necessario')
        article.title = title

        existsOrError(content, 'O conteudo é necessario')
        article.content = content

        await Article.findOneAndUpdate(
            { _id: article.id },
            { $set: article },
            { new: true }
        )

        res.send('Artigo editado com sucesso')

    } catch (msg) {
        res.status(400).send(msg)
    }
}

module.exports = editArticle