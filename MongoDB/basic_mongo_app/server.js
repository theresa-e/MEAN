var path = require("path")

// ---------- Express ----------
const express = require('express');
const app = express();
const server = app.listen(7000);
console.log("Running at port 7000...");

// ---------- Body Parser ----------
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// ---------- View Engine ----------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// ---------- Static Views ----------
app.use(express.static(__dirname + '/static'));

// ---------- Mongoose ----------
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/basic_mongoose');
mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({ // JS object that defines the schema. Blueprint. 
    name: String,
    age: Number
})
mongoose.model('User', UserSchema) // Set this schema in our models as 'User'
var User = mongoose.model('User'); // We retrieve this schema named 'User' from our models. Object constructor.

// ---------- Session ----------
var session = require('express-session');
app.use(session({
    secret: 'theresa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

// ---------- Routing ----------
app.get('/', function (req, res) {
    // Retrieve all users from the database.
    User.find({}, function (err, users) {
        if (err) {
            console.log("Error - could not retrieve all users.");
        } else {
            existingUsers = users;
            console.log("Successfully retrieved users:");
            console.log(existingUsers);
            // Pass array of users to index.ejs.
            res.render('index', {
                users: existingUsers
            });
        }
    })
})

app.post('/users', function (req, res) {
    console.log("Post Data :", req.body);
    var user = new User({
        name: req.body.name,
        age: req.body.age
    });
    // Create a new user and save.
    user.save(function (err) {
        if (err) {
            console.log("Error - please check form submission.");
        } else {
            console.log("Added a new user to database:");
            console.log(user);
            res.redirect('/quotes');
        }
    })
});