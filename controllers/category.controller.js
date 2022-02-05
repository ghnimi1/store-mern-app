const Category = require('../models/category.model')

// GET ALL CATEGORY
const getAllCategory = async (req, res) => {
    const category = await Category.find({})
    res.status(200).send(category)
}
//CREATE CATEGORY
const createCategory = async (req, res) => {

    try {
        const category = new Category({
            categoryName: req.body.categoryName
        })
        const createdCategory = await category.save()
        res.status(201).json(createdCategory)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
//DELETE CATEGORY
const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        const category = await Category.findByIdAndDelete({ _id: id })
        if (!category) {
            res.status(404).send({ msg: `No category with id : ${id}` })
        }
        res.status(200).send({ msg: 'category deleted' })
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
//UPDATE CATEGORY
const updateCategory = async (req, res) => {
    const { categoryName } = req.body
    const category = await Category.findById(req.params.id)
    try {
        if (category) {
            category.categoryName = categoryName
        }
        const updatedCategory = await category.save()
        res.status(201).send(updatedCategory)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
module.exports = {
    getAllCategory,
    createCategory,
    deleteCategory,
    updateCategory,
}