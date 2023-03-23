
// Dotenv
require('dotenv').config();

// Express
const express = require('express');
const app = express();

// Body Parser
const bodyParser = require('body-parser');

// OS to get hostname and ip address of the server
const os = require('os');

// EJS
app.set('view engine', 'ejs');

// Get all routes
app.get("*", (req, res) => {

	// Log incoming request
	console.log("Incoming request from " + req.ip + " to " + req.originalUrl);

	res.render("index", { 
		// Render the home page with the data below
		hostname: JSON.stringify(os.hostname()),
		ip: JSON.stringify(os.networkInterfaces(), null, 4),
	});
});

// Listen to port
app.listen(process.env.PORT, () => {
	console.log("Server started on port " + process.env.PORT);
});