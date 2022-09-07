const verifyId = require('../../helper/verifyId')
const Article = require('../../models/Articles')
const userEqualsOrError = require('../../helper/verify-user')
const checkExists = require('../../helper/check-exists')

const removeArticleById = async (req, res) => {
    const id = req.params.id
    
    try {
        verifyId(id, 'O id é invalido')

        const article = await Article.findOne({ _id: id })
        checkExists(article, 'Artigo não encontrado!')

        const userId = article.user._id
        console.log(article)
        userEqualsOrError(req, userId, 'Acesso negado')

        await Article.findOneAndDelete({_id: id})
        res.status(200).send('Artigo deletado com sucesso!')

    } catch (msg) {
        res.status(400).send(msg)
    }
    
}



module.exports = removeArticleById