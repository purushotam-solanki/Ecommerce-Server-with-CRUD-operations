const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const CategorySchema = mongoose.Schema({
    categoryId: {
        type: String,
        unique: true
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
CategorySchema.plugin(mongoosePaginate);
const Category = mongoose.model("categories", CategorySchema)
module.exports = Category