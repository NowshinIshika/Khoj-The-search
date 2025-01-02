const express = require('express');
const { getPendingItems, approveItem, rejectItem } = require('../Controllers/adminController');
const { getAnalytics } = require('../Controllers/analyticsController');
const { getCategories, upsertCategory, deleteCategory } = require('../Controllers/categoryController');
const { createAnnouncement, getAnnouncements } = require('../Controllers/announcementController');
const { isAuthenticated} = require('../Middlewares/AuthValidation');
const { isAdmin} = require('../Middlewares/AdminMiddleware');

const router = express.Router();

// Apply authentication middleware globally
router.use(isAuthenticated);

// Admin Routes for Item Moderation
router.use(isAdmin); // Ensure only admins can access these routes
router.get('/items/pending', getPendingItems); // Get pending items
router.put('/items/:id/approve', approveItem); // Approve an item
router.put('/items/:id/reject', rejectItem);   // Reject an item


// Analytics Route
router.get('/analytics', isAdmin, getAnalytics); // Restricted to admins

// Category and Tag Management Routes
router.get('/categories', getCategories);           // View all categories
router.post('/categories', upsertCategory);         // Add or update a category
router.delete('/categories/:id', deleteCategory);   // Delete a category

// Announcement Routes
router.post('/announcements', isAdmin, createAnnouncement);  // Post an announcement
router.get('/announcements', getAnnouncements);             // View announcements

module.exports = router;
