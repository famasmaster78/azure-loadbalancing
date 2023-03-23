
// Dotenv
require('dotenv').config();

// Mysql
const mysql = require('mysql2');

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

	// Variable to store data from mysql
	let data = [];

	// Create mysql connetion
	const connection = mysql.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});

	// Connect to mysql
	connection.connect((err) => {
		if (err) {
			console.log("Error connecting to database: " + err);
			return res.status(500).send("Error connecting to database");
		}
	});

	// Query the database
	connection.query("SELECT * FROM users", (err, rows, fields) => {
		if (err) {
			console.log("Error querying database: " + err);
			return res.status(500).send("Error querying database");
		}
		// Update data
		data = rows;
	});

	// Log incoming request
	console.log("Incoming request from " + req.ip + " to " + req.originalUrl);

	res.render("index", { 
		// Render the home page with the data below
		hostname: JSON.stringify(os.hostname()),
		ip: JSON.stringify(os.networkInterfaces(), null, 4),
		data: JSON.stringify(data, null, 4)
	});
});

// Listen to port
app.listen(process.env.PORT, () => {
	console.log("Server started on port " + process.env.PORT);
});