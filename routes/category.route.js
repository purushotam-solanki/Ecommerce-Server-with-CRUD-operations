const router = require("express").Router()

const categoryController = require("../controllers/category.controller");
const categoryRoutesBodyValidationSchema = require("../validations/category.validation")
const validate = require("../middlewares/validation");

router.get("/", categoryController.getAllCategoires);
router.post("/add", validate(categoryRoutesBodyValidationSchema.addCategories), categoryController.addCategories);
router.put("/update", validate(categoryRoutesBodyValidationSchema.updateCategories), categoryController.updateCategories);
router.delete("/delete", validate(categoryRoutesBodyValidationSchema.deleteCategories), categoryController.removeCategories)

module.exports = router