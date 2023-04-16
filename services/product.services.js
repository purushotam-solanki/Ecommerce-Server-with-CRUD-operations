const Products = require("../model/product.model")

const fetchProducts = async (filter = {}, options = {}) => {
    try {
        options.page = !options.page ? 1 : options.page;
        options.limit = !options.limit ? 10 : options.limit;
        const docs = await Products.paginate(filter, { ...options });
        return docs?.docs || []
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    fetchProducts
}
