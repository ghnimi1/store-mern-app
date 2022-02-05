const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category.controller')
const auth = require('../middleware/auth')

router.get('/', categoryController.getAllCategory)
router.post('/', auth, categoryController.createCategory)
router.delete('/:id', auth, categoryController.deleteCategory)
router.put('/:id', auth, categoryController.updateCategory)

module.exports = router