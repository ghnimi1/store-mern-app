const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order.controller')
const auth = require('../middleware/auth')

router.get('/', auth, orderController.getAllOrder)
router.post('/', auth, orderController.addOrder)
router.get('/me', auth, orderController.getMyOrders)
router.get('/:id', auth, orderController.getOrderById)
router.put('/:id/paid', auth, orderController.updateOrderToPaid)
router.put('/:id/delivered', auth, orderController.updateOrderToDelivered)
router.delete('/:id', auth, orderController.deleteOrder)

module.exports = router