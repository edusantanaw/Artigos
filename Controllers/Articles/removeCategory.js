const { existsOrError } = require('../../helper/validations')
const verifyId = require('../../helper/verifyId')
const Article = require('../../models/Articles')
const Categories = require('../../models/Category')

const removeCategory = async (req, res) => {
    const categoryId = req.params.id

    try {
        verifyId(categoryId, 'Categoria não existe!')
        const category = await Categories.findOne({_id: categoryId  })
        const articles = await Article.find()

        for(let i = 0; i < articles.length; i++){
             let articleName = articles[i].category.name
            if(articleName === category.name){
                let msg = 'Remova os artigos da categoria antes  de continuar!'
                throw msg
            }
        }

        if(!category){
            let msg = 'Categoria não encontrada!'
            throw msg
        }
        await Categories.deleteOne({_id: categoryId})
        res.status(200).send('Categoria deletada com sucesso!')

    } catch (msg) {
        res.status(401).send(msg)
    }
}

module.exports = removeCategory
