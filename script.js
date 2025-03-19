const express = require('express');
const app = express();
const port = 3000;

// Simulated database of users (this would normally be a real database)
const users = [
    { id: 1, name: "Alice", location: "New York" },
    { id: 2, name: "Bob", location: "California" },
    { id: 3, name: "Charlie", location: "New York" },
    { id: 4, name: "Dave", location: "California" },
    { id: 5, name: "Eve", location: "Chicago" },
];

// Middleware to parse JSON body
app.use(express.json());

// API endpoint to share the business card
app.post('/share-card', (req, res) => {
    const { name, title, email, phone, location } = req.body;

    // Find users with matching location
    const matchingUsers = users.filter(user => user.location.toLowerCase() === location.toLowerCase());

    if (matchingUsers.length === 0) {
        return res.status(404).json({ success: false, message: 'No matching users found in this location.' });
    }

    // Randomly select a user to send the card to
    const randomUser = matchingUsers[Math.floor(Math.random() * matchingUsers.length)];

    // Simulate sending the card to the random user
    console.log(`Shared business card with ${randomUser.name} (${randomUser.location})`);
    
    // Respond to the front-end
    res.json({ success: true, message: `Card shared with ${randomUser.name}` });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
