const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
},
    {
        timestamps: true,
    })

module.exports = mongoose.model('Category', categorySchema)