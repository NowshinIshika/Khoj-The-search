const Item = require('../Models/Item.js');

// 1. Get All Items Pending Approval
const getPendingItems = async (req, res) => {
    try {
        const items = await Item.find({ status: 'pending' });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pending items" });
    }
};

// 2. Approve an Item
const approveItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        item.status = 'approved';
        item.updatedAt = Date.now();
        await item.save();

        res.status(200).json({ message: "Item approved successfully", item });
    } catch (error) {
        res.status(500).json({ error: "Failed to approve item" });
    }
};

// 3. Reject an Item
const rejectItem = async (req, res) => {
    try {
        const id = req.params.id;
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        item.status = 'rejected';
        item.updatedAt = Date.now();
        await item.save();

        res.status(200).json({ message: "Item rejected successfully", item });
    } catch (error) {
        res.status(500).json({ error: "Failed to reject item" });
    }
};

module.exports = { getPendingItems, approveItem, rejectItem };










