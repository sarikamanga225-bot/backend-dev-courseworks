
const express = require("express");

const app = express();

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Backend Development");
});

// About route
app.get("/about", (req, res) => {
    res.status(200).json({
        name: "M. Sarika",
        section: "AIDE-2B"
    });
});

// Time route
app.get("/time", (req, res) => {
    res.status(200).json({
        dateTime: new Date()
    });
});

// Unknown route
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
app.listen(3000, () => {
    console.log("Express server running on port 3000");
});
