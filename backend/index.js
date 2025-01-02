require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const itemRoutes = require('./Routes/adminRoutes');
const userRoutes = require('./Routes/adminRoutes');
const adminRoutes = require('./Routes/adminRoutes');
const AuthRoutes = require('./Routes/AuthRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    console.log('Request Body:', req.body);  
    next();
});

// Session Middleware
app.use(session({
  secret: 'your_secret_key', // Replace with a secure key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/api/items', itemRoutes);
app.use('/auth', AuthRoutes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/userprofile', userRoutes);
app.use('/api/admin', adminRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
}).catch((error) => {
    console.error('Database connection error:', error);
});

// Ping route for testing
app.get('/ping', (req, res) => {
    res.send('PONG');
});