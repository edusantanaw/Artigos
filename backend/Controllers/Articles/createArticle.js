const Article = require('../../models/Articles')
const { existsOrError } = require('../../helper/validations')
const getToken = require('../../helper/get-token')
const getUserByToken = require('../../helper/get-user-by-token')
const Categories = require('../../models/Category')

const createArticle = async (req, res) => {

    const { category, title, content, summary } = req.body

    try {
        existsOrError(category, 'A categoria é obrigatoria!')
        existsOrError(title, 'O titulo é obrigatorio!')
        existsOrError(content, 'O conteudo esta vazio!')
        existsOrError(summary, 'A descrição é obrigatoria!')
        const token = getToken(req)
        const user = await getUserByToken(token)
        const categoryName = await Categories.findOne({name: category})
        if(!categoryName){
            let msg = 'Esta categoria não Existe!'
            throw msg
        }
        categoryName.totArticles += 1
        
        const article = new Article({
            category: category,
            title: title,
            summary: summary,
            content: content,
            user: {
                _id: user.id,
                name: user.name,
                email: user.email,
            }
        })
        await Categories.findOneAndUpdate(
            {_id: categoryName._id},
            {$set: categoryName},
            {new: true}
        )

        await article.save()
        res.status(200).send('Artigo criado com sucesso!')

    } catch (msg) {
        res.status(400).send(msg)
    }

}

module.exports = createArticle