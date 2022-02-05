const Product = require('../models/product.model')

// GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
    const pageSize = 20
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

    res.json({ products, page, pages: Math.ceil(count / pageSize) })
}
//GET PRODUCT 
const getProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findOne({ _id: id })
        if (!product) {
            res.status(404).send(`No product with id : ${id}`)
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
//CREATE PRODUCT
const createProduct = async (req, res) => {
    if (req.file) {
        image = req.file.path
    }
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            user: req.user._id,
            image: image,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            numReviews: req.body.numReviews,
            description: req.body.description,
        })
        const createdProduct = await product.save()
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
//DELETE PRODUCT
const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findByIdAndDelete({ _id: id })
        if (!product) {
            res.status(404).send({ msg: `No product with id : ${id}` })
        }
        res.status(200).send({ msg: 'product deleted' })
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
//UPDATE PRODUCT
const updateProduct = async (req, res) => {
    const { name, price, brand, category,
        countInStock, description } = req.body
    if (req.file) {
        image = req.file.path
    }
    const product = await Product.findById(req.params.id)
    try {
        if (product) {
            product.name = name,
                product.price = price,
                product.image = image,
                product.brand = brand,
                product.category = category,
                product.countInStock = countInStock,
                product.description = description
        }
        const updatedProduct = await product.save()
        res.status(201).send(updatedProduct)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

//createProductReview
const createProductReview = async (req, res) => {
    const { rating, comment } = req.body
    try {
        const product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviwed =
                product.reviews.find(review => review.user.toString() === req.user._id.toString())
            if (alreadyReviwed) {
                res.status(404).send({ msg: 'Product already reviewed' })
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length
            await product.save()
            res.status(201).send({ msg: 'review added' })
        }
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}

//get Top Products
const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(3)
        res.json(products)
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}


module.exports = {
    getAllProduct,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    createProductReview,
    getTopProducts
}