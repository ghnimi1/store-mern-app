const express = require('express')
const router = express.Router()
const productController = require('../controllers/product.controller')
const fileUpload = require('../middleware/file-upload')
const auth = require('../middleware/auth')

router.get('/', productController.getAllProduct)
router.get('/top', productController.getTopProducts)
router.post('/', auth, fileUpload.single('image'), productController.createProduct)
router.get('/:id', productController.getProduct)
router.delete('/:id', auth, productController.deleteProduct)
router.put('/:id', auth, fileUpload.single('image'), productController.updateProduct)
router.post('/:id/reviews', auth, productController.createProductReview)

module.exports = router