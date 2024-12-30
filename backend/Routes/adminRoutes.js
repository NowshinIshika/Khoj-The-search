const express = require('express');
const { getPendingItems, approveItem, rejectItem } = require('../Controllers/adminController');
const { isAuthenticated, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin Routes for Item Moderation
router.use(isAuthenticated); // Ensure the user is logged in
router.use(isAdmin);         // Ensure the user is an admin

router.get('/items/pending', getPendingItems); // Get pending items
router.put('/items/:id/approve', approveItem); // Approve an item
router.put('/items/:id/reject', rejectItem);   // Reject an item

module.exports = router;
const { getAllUsers, updateUserRole, deleteUser } = require('../Controllers/adminController');

// User Management Routes
router.get('/users', getAllUsers);               // View all users
router.put('/users/:id/role', updateUserRole);   // Update user role
router.delete('/users/:id', deleteUser);         // Delete user
const { getAnalytics } = require('../Controllers/adminController');

// Analytics Route
router.get('/analytics', getAnalytics);

const { getCategories, upsertCategory, deleteCategory } = require('../Controllers/adminController');

// Category and Tag Management Routes
router.get('/categories', getCategories);           // View all categories
router.post('/categories', upsertCategory);         // Add or update a category
router.delete('/categories/:id', deleteCategory);   // Delete a category


const { createAnnouncement, getAnnouncements } = require('../Controllers/adminController');

// Announcement Routes
router.post('/announcements', createAnnouncement);  // Post an announcement
router.get('/announcements', getAnnouncements);     // View announcements
