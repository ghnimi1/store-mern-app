const Order = require('../models/order.model')

const getAllOrder = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    res.status(200).send(orders)
}

const addOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    try {
        if (orderItems && orderItems.length === 0) {
            res.status(400).send({ msg: 'No order items' })
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            })
            const createdOrder = await order.save()
            res.status(201).json(createdOrder)
        }
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    try {
        if (!order) {
            res.status(400).send({ msg: 'Order Not Found' })
        }
        res.status(200).send(order)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address,
            }
            const updatedOrder = await order.save()
            res.status(200).send(updatedOrder)
        }
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (order) {
            order.isDelivered = true
            order.deliveredAt = Date.now()
            const updatedOrder = await order.save()
            res.status(200).send(updatedOrder)
        }
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete({ _id: req.params.id })
        if (!order) {
            res.status(400).send({ msg: 'Order not found' })
        }
        res.status(200).send('Order Deleted')
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

module.exports = {
    getAllOrder,
    getOrderById,
    getMyOrders,
    addOrder,
    updateOrderToPaid,
    updateOrderToDelivered,
    deleteOrder
}