const { existsOrError } = require('../../helper/validations')
const Categories = require('../../models/Category')

const createCategory = async(req, res)=> {
    const category = req.body.category
    const img = req.file
    try{
        existsOrError(category, 'O nome da categoria é necessaria!')
        const categories = await Categories.findOne({name: category})
        if(categories){
            let msg = 'Esta categoria ja existe!'
            throw msg
        }

        const newCategory = new Categories({
            name: category,
            img: img,
            totArticles: 0
        })
    
        await newCategory.save()

        res.status(200).send('Categoria criada com sucesso!')

    }catch(msg){
        res.status(400).send(msg)
    }

}

module.exports = createCategory