const Item = require('../Models/Item');
const User = require('../Models/user');

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
            rejectedItems,
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch analytics data" });
    }
};

module.exports = { getAnalytics };
