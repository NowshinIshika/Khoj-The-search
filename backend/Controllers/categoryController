const Category = require('../models/Category');

// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch categories" });
    }
};

// Add or Update a Category
const upsertCategory = async (req, res) => {
    try {
        const { name, tags } = req.body;

        const category = await Category.findOneAndUpdate(
            { name },
            { $set: { tags } },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: "Category updated", category });
    } catch (error) {
        res.status(500).json({ error: "Failed to upsert category" });
    }
};

// Delete a Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete category" });
    }
};

module.exports = { getCategories, upsertCategory, deleteCategory };
