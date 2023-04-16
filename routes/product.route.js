const router = require("express").Router()

const productController = require("../controllers/product.controller");
const validate = require("../middlewares/validation")
const productRoutesBodySchemaValidation = require("../validations/product.validation")

router.get("/", productController.getAllProducts);
router.get("/category/:categoryId", productController.getProductsByCategoryId)
router.post("/add", validate(productRoutesBodySchemaValidation.addProducts), productController.addProducts);
router.put("/update", validate(productRoutesBodySchemaValidation.updateProducts), productController.updateProducts);
router.delete("/delete", validate(productRoutesBodySchemaValidation.deleteProducts), productController.removeProducts)

module.exports = router