const Promise = require("bluebird")

const Products = require("../model/product.model");
const { generateId } = require("../utils/generateId");
const { fetchProducts } = require("../services/product.services");

const getAllProducts = async (req, res) => {
    try {
        const options = {
            page: req.query?.page,
            limit: req.query?.limit,
            select: {
                _id: 0
            },
            sort: {
                createdAt: -1
            }
        }
        const products = await fetchProducts({}, options);
        res.status(200).json({ products })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getProductsByCategoryId = async (req, res) => {
    try {
        const filter = {
            categoryId: req.params?.categoryId
        }
        const options = {
            page: req.query?.page,
            limit: req.query?.limit,
            select: {
                _id: 0
            },
            sort: {
                createdAt: -1
            }
        }
        const products = await fetchProducts(filter, options);
        res.status(200).json({ products })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addProducts = async (req, res) => {
    try {
        let productsToAdd = req.body;
        productsToAdd = productsToAdd.map(item => {
            const productId = generateId("P");
            return {
                ...item,
                productId
            }
        })
        //TODO: Check if given categoryId exists or not
        await Products.insertMany(productsToAdd)
        res.status(200).json({ message: "products addded successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateProducts = async (req, res) => {
    try {
        const productsToUpdate = req.body;
        await Promise.map(productsToUpdate, async (product) => {
            const fieldsToUpdate = {};
            for (field in product) {
                fieldsToUpdate[field] = product[field]
            }
            await Products.updateOne({ productId: product.productId }, fieldsToUpdate)
        })
        res.status(200).json({ message: "Updated Successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const removeProducts = async (req, res) => {
    try {
        const response = await Products.deleteMany({ productId: { $in: [...req.body] } })
        if (response.acknowledged && response.deletedCount === 0) {
            return res.status(400).json({ status: false, message: "Products not found! Please check ProdcutId " })
        } else {
            return res.status(200).json({ message: "Removed Successfully" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllProducts,
    updateProducts,
    addProducts,
    removeProducts,
    getProductsByCategoryId
}