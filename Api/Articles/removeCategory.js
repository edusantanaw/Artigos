const { existsOrError } = require('../../helper/validations')
const Article = require('../../models/Articles')

const removeCategory = async (req, res) => {
    const { category } = req.body

    try {
        existsOrError(category, 'Categoria não selecionada!')
        const categoryName = await Article.find({ category: category })
        if(categoryName.length === 0){
            let msg = 'Categoria não encontrada!'
            throw msg
        }
        await Article.deleteMany({category: category})
        res.status(200).send('Categoria deletada com sucesso!')

    } catch (msg) {
        res.status(401).send(msg)
    }
}

module.exports = removeCategory
