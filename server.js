// Final Deployment Sync
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Connection Error:", err));

// 2. Link the Routes Folder
// This tells Express that any URL starting with /api/users should use the User.js file
app.use('/api/users', require('./routes/User'));

// 3. Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Simple API test route
app.get('/api/test', (req, res) => res.json({ message: "API is working!" }));

// 4. Redirect all other requests to React index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// 5. Port Configuration for Azure
const PORT = process.env.PORT || 8080; 
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
});