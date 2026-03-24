const express = require('express');
const path = require('path');
const app = express();
const PORT = 3002;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, 'localhost', () => {
    console.log(`TEST: iPropertiesAfrica Server is running on http://localhost:${PORT}`);
    console.log(`Project location: ${__dirname}`);
    console.log(`Press Ctrl+C to stop the server`);
});