const Article = require('../../models/Articles')
const { existsOrError } = require('../../helper/validations')
const getToken = require('../../helper/get-token')
const getUserByToken = require('../../helper/get-user-by-token')

const createArticle = async (req, res) => {

    const { category, title, content } = req.body

    try {
        existsOrError(category, 'A categoria é obrigatoria!')
        existsOrError(title, 'O titulo é obrigatorio!')
        existsOrError(content, 'O conteudo esta vazio!')

        const token = getToken(req)
        const user = await getUserByToken(token)

        const article = new Article({
            category: category,
            title: title,
            content: content,
            user: {
                name: user.name,
                _id: user.id
            }
        })

        await article.save()
        res.status(200).send('Artigo criado com sucesso!')

    } catch (msg) {
        res.status(400).send(msg)
    }

}

module.exports = createArticle