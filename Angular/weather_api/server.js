var path = require("path")

/* ---------- Express ---------- */
const express = require('express');
const app = express();
const server = app.listen(7000);
console.log("Running at port 7000...");

/* ---------- Body Parser ---------- */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // Configure to read JSON data
app.use(bodyParser.urlencoded({
    extended: true
}));

/* ---------- Static ---------- */
app.use(express.static(__dirname + '/public/dist/public'));

/* ---------- Routes ---------- */
app.all("*", (req, res) => {
    console.log('Redirecting user back to public/index.');
    res.sendFile(path.resolve('./public/dist/public/index.html'));
})