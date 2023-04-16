const Joi = require("joi")

const validate = (schema) => {
    return (
        async (req, res, next) => {
            try {
                const { value, error } = schema.validate(req.body, { abortEarly: false })
                if (error) {
                    throw new Error(error)
                }
                return next()
            } catch (err) {
                res.status(400).json({ status: false, message: err.message })
            }
        }
    )
}

module.exports = validate
