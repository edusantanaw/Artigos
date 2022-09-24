const verifyId = require('../../helper/verifyId')
const Categories = require('../../models/Category')
const Articles = require('../../models/Articles')


const getCategory = async (req, res) => {
    try {
        const category = await Categories.find({})
        const articles = await Articles.find({})
        res.json(category)
    } catch (msg) {
        res.status(400).send(msg)
    }
}

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id

    try {
        verifyId(categoryId)
        const category = await Categories.findOne({ _id: categoryId })
        const articles = await Articles.find()
        if (!category) {
            let msg = 'Categoria não encontrada!'
            throw msg
        }
        res.json(category)

    } catch (msg) {
        res.status(400).send(msg)
    }
}

module.exports = { getCategory, getCategoryById }