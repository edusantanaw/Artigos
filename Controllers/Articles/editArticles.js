const verifyId = require('../../helper/verifyId')
const Article = require('../../models/Articles')
const { existsOrError } = require('../../helper/validations')
const checkExists = require('../../helper/check-exists')

const editArticle = async (req, res) => {

    const id = req.params.id
    const { category, title, content, summary } = req.body

    try {
        verifyId(id, 'Id invalido!')

        const article = await Article.findOne({ _id: id })
        checkExists(article, 'Artigo não  encontrado!')

        const userId = article.user._id
      
        if(category) article.category = category
        if(title)article.title = title
        if(content)article.content = content
        if(summary) article.summary = summary   

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