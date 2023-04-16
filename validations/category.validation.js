const Joi = require('joi');

const addCategories = Joi.array().min(1).items(
    Joi.object().keys({
        name: Joi.string().required(),
        image: Joi.string(),
        description: Joi.string()
    })
)

const updateCategories = Joi.array().min(1).items(
    Joi.object().keys({
        categoryId: Joi.string().required(),
        name: Joi.string(),
        description: Joi.string(),
        image: Joi.string()

    })
)

const deleteCategories = Joi.array().min(1).items(
    Joi.string().required()
)

module.exports = {
    addCategories,
    updateCategories,
    deleteCategories
}