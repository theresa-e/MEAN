/* ---------- Express ---------- */
const express = require('express');
const app = express();
const server = app.listen(3000);
console.log("Running at port 3000...");

/* ---------- Static Views ---------- */
app.use(express.static(__dirname + '/public/dist/public')); // Will render index.html from angular

/* ---------- Body Parser ---------- */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // Configure to read JSON data
app.use(bodyParser.urlencoded({
    extended: true
}));

/* ---------- Mongoose ---------- */
var mongoose = require('mongoose');

/* ---------- Routing ---------- */
require('./server/config/routes.js')(app)