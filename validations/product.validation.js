const Joi = require("joi")

const addProducts = Joi.array().min(1).items({
    name: Joi.string().required(),
    categoryId: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string()
})

const updateProducts = Joi.array().min(1).items(
    Joi.object().keys({
        productId: Joi.string().required(),
        categoryId: Joi.string(),
        name: Joi.string(),
        description: Joi.string(),
        image: Joi.string()
    })
)

const deleteProducts = Joi.array().min(1).items(
    Joi.string().required()
)

module.exports = {
    addProducts,
    updateProducts,
    deleteProducts
}