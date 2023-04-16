const Promise = require("bluebird")

const Category = require("../model/category.model")

const { generateId } = require("../utils/generateId")

const getAllCategoires = async (req, res) => {
    try {
        const options = {
            page: req.query?.page || 1,
            limit: req.query?.limit || 10,
            select: {
                _id: 0
            },
            sort: {
                createdAt: -1
            }
        }
        const docs = await Category.paginate({}, options);
        res.status(200).json({ categories: [...docs?.docs] })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const addCategories = async (req, res) => {
    try {
        const categoires = req.body;
        const updatedCategories = categoires.map(category => {
            const categoryId = generateId("C")
            return {
                ...category,
                categoryId
            }
        })
        await Category.insertMany(updatedCategories)
        res.status(200).json({ message: "categoires addded successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updateCategories = async (req, res) => {
    try {
        const categoiresToUpdate = req.body;
        await Promise.map(categoiresToUpdate, async (category) => {
            const fieldsToUpdate = {};
            for (field in category) {
                if (field === "categoryId") {
                    continue;
                }
                fieldsToUpdate[field] = category[field]
            }
            await Category.updateOne({ categoryId: category.categoryId }, { ...fieldsToUpdate })
        })
        res.status(200).json({ message: "Updated Successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const removeCategories = async (req, res) => {
    try {
        const response = await Category.deleteMany({ categoryId: { $in: [...req.body] } })
        if (response.acknowledged && response.deletedCount === 0) {
            return res.status(400).json({ status: false, message: "Categories not found! Please check categoryId " })
        } else {
            return res.status(200).json({ message: "Removed Successfully" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getAllCategoires,
    updateCategories,
    addCategories,
    removeCategories
}