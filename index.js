
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
	connection.query("SELECT * FROM test_table", (err, rows, fields) => {
		if (err) {
			console.log("Error querying database: " + err);
			return res.status(500).send(`Error querying database + ${process.env.DB_HOST} + ${process.env.DB_USER} + ${process.env.DB_NAME}`);
		}
		// Update data
		data = rows;

		res.render("index", { 
			// Render the home page with the data below
			hostname: os.hostname(),
			ip: os.networkInterfaces().eth0[0],
			data: data
		});

	});

	// Log incoming request
	console.log("Incoming request from " + req.ip + " to " + req.originalUrl);

});

// Listen to port
app.listen(process.env.PORT, () => {
	console.log("Server started on port " + process.env.PORT);
});