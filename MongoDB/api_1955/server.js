var path = require("path")

/* ---------- Express ---------- */
const express = require('express');
const app = express();
const server = app.listen(7000);
console.log("Running at port 7000...");

/* ---------- Body Parser ---------- */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // Configure to read JSON data

/* ---------- Mongoose ---------- */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api_1955');
mongoose.Promise = global.Promise;
var PersonSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    name: {
        type: String,
        required: [true],
        minlength: 5
    },
}, {
    timestamps: true
});
mongoose.model('Person', PersonSchema)
var Person = mongoose.model('Person');

/* ---------- Routing ---------- */

// View all people
app.get('/', function (req, res) {
    Person.find({}, function(err, persons){
        if (err){
            console.log("------- Error: Could not retrieve all users.");
            res.json({message: "Error", error: err});
        } else {
            res.json({message: "Success", persons: persons});
        }
    })
});

// Add a new person to the database. 
app.get('/new/:name/', function(req, res){
    var person = new Person({
        name: req.params.name
    })
    person.save(function (err){
        if (err){
            console.log('------- Error: Could not save this user.');
            res.json({message: "Error", error:err});
        } else {
            res.json({message: "Successfully added person", new_person:person});
        }
    })
})

// Remove person from database.
app.get('/remove/:name/', function(req, res){
    console.log(req.params.name)
    Person.findOneAndRemove({name:req.params.name}, function(err, person){
        if (err){
            console.log('------- Error: Could not remove user.');
            res.json({message: "Errors", errors:err})
        } else {
            console.log('------- Success: Found user by name.');
            res.json({message: "Success!", })
        }
    });
})

// Show info based on user name.
app.get('/:name', (req, res) => {
    Person.findOne({name:req.params.name}, (err, person) => {
        if (err){
            console.log('------- Error: Could not find user by that name.');
            res.json({message: "Error", errors: err});
        } else {
            console.log('------- Success: Found user by name.')
            res.json({message: "Success", foundPerson: person});
        }
    })
})