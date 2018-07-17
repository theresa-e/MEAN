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

mongoose.connect('mongodb://localhost/ninjaGold');
mongoose.Promise = global.Promise;
var GoldSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    gold: {
        type: Number
    },
    messages: {
        type: Array,
        required: true,
        minLength: 3
    },
}, {
    timestamps: true
});
mongoose.model('Gold', GoldSchema)
var Gold = mongoose.model('Gold');

/* ---------- Session ---------- */
var session = require("express-session");
app.use(session({
    secret: 'theresa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

/* ---------- Routing ---------- */

// Retrieve amount of gold
app.get('/gold', (req, res) => {
    Gold.find({}, (err, gold) => {
        if (err){
            console.log("------ Error: Could not retrieve gold.");
            res.json({
                message: "Error",
                error: err
            });
        } else {
            res.json({
                message: "Success",
                gold: res
            });
        }
    })
})

// When user clicks 'new game' button, a new game is created. 
app.post('/gold', (req, res) => {
    var gold = new Gold();
    gold.save(function(err){
        if (err){
            console.log('------- Error: Could not create a new game.');
            res.json({
                message: "Error",
                error: err
            });
        } else {
            res.json({
                message: "Successfully created new game.",
                new_gold: gold
            })
        }
    })
})