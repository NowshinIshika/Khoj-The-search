const Item = require('../models/itemModel');

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
        const itemId = req.params.id;
        const item = await Item.findById(itemId);

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
        const itemId = req.params.id;
        const item = await Item.findById(itemId);

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
const User = require('../models/user');

// 1. View All Users||||||||2
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

// 2. Update User Role
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.role = role;
        await user.save();

        res.status(200).json({ message: "User role updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Failed to update user role" });
    }
};

// 3. Delete User
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};

module.exports = { getAllUsers, updateUserRole, deleteUser };

// Analytics
const Analytics = require('../models/Analytics');
const Item = require('../models/Item');
const User = require('../models/user');

// Get Analytics Data
const getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalItems = await Item.countDocuments();
        const approvedItems = await Item.countDocuments({ status: 'approved' });
        const rejectedItems = await Item.countDocuments({ status: 'rejected' });

        res.status(200).json({
            totalUsers,
            totalItems,
            approvedItems,
            rejectedItems
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics data" });
    }
};

module.exports = { getAnalytics };


//tags, categories||||||||||||3
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

// Add or Update Category
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

// Delete Category
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

const Announcement = require('../models/Announcement');

// Create Announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, priority } = req.body;

        const announcement = new Announcement({ title, message, priority });
        await announcement.save();

        res.status(201).json({ message: "Announcement created", announcement });
    } catch (error) {
        res.status(500).json({ error: "Failed to create announcement" });
    }
};

// Get Announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch announcements" });
    }
};

const approveClaim = async (req, res) => {
    try {
        const itemId = req.params.id; // Get the item ID from the URL parameters
        const { userId } = req.body; // Get the user ID from the request body (who is claiming the item)

        const item = await Item.findById(itemId); // Find the item by its ID

        if (!item) {
            return res.status(404).json({ error: "Item not found" }); // Return error if the item is not found
        }

        if (item.status !== 'approved') {
            return res.status(400).json({ error: "Item must be approved before it can be claimed" }); // Check if the item is approved first
        }

        // Find the claim request that matches the userId
        const claimRequestIndex = item.claimRequests.findIndex(request => request.user.toString() === userId);

        if (claimRequestIndex === -1) {
            return res.status(400).json({ error: "Claim request not found for this user" }); // If no matching claim request is found
        }

        // Approve the claim request
        item.status = 'claimed'; // Set the item's status to 'claimed'
        item.claimedBy = userId; // Set the 'claimedBy' field to the userId of the claimant
        item.claimRequests = []; // Clear the claimRequests array as the request is now processed

        await item.save(); // Save the changes to the item

        res.status(200).json({ message: "Claim approved successfully", item }); // Return success response
    } catch (error) {
        res.status(500).json({ error: "Failed to approve claim" }); // Return error if something goes wrong
    }
};

module.exports = { createAnnouncement, getAnnouncements, approveClaim };