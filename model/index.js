const mongoosePaginate = require("mongoose-paginate-v2")

module.exports.Category = require("../model/category.model")
module.exports.Product = require("../model/product.model")

//default pagination values
mongoosePaginate.paginate.options = {
    limit: 10,
    page: 1,
    lean: true,
};