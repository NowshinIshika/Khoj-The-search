const Announcement = require('../Models/Announcement');

// Create an Announcement
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

// Get All Announcements
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch announcements" });
    }
};

module.exports = { createAnnouncement, getAnnouncements };
