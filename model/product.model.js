const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const ProductSchema = mongoose.Schema({
    productId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    categoryId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    image: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
})
ProductSchema.plugin(mongoosePaginate)
const Products = mongoose.model("products", ProductSchema)
module.exports = Products