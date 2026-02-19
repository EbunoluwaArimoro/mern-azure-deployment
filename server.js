const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ Connection Error:", err));

// Serve static files from the 'public' folder (where React build will go)
app.use(express.static(path.join(__dirname, 'public')));

// Simple API test route
app.get('/api/test', (req, res) => res.json({ message: "API is working!" }));

// Redirect all other requests to React index.html
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));