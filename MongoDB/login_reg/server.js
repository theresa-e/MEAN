var path = require("path")

// ---------- Express ----------
const express = require('express');
const app = express();
const server = app.listen(7000);
console.log("Running at port 7000...");

// ---------- Flash ----------
var flash = require("express-flash");
app.use(flash());

// ---------- Session ----------
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}))

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

// ---------- Bcrypt ----------
const bcrypt = require('bcrypt');

// ---------- Mongoose ----------
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login_reg');
mongoose.Promise = global.Promise;
var UserSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    email: {
        type: String,
        required: true,
        minlength: 5
    },
    first_name: {
        type: String,
        required: true,
        min: 3,
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    birthday: {
        type: String,
        required: true,
        min: 8
    }
}, {
    timestamps: true
});
mongoose.model('User', UserSchema)
var User = mongoose.model('User');

// ---------- Routing ----------

app.get('/', function (req, res) {
    res.render('index');
});

// User registers for an account
app.post('/register', function (req, res) {
    console.log("Post Data : ", req.body);
    bcrypt.hash(req.body.password, 10, function(err, hash){ // hash user's password
        var user = new User({
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hash,
            birthday: req.body.bday
        });
        User.find({email: user.email}, function (err, users) {
            if (users.length) { // if we have an occurence of that email in our database
                console.log(users)
                console.log('--- User already exists--- ');
                res.redirect('/');
            } else {
                user.save(function (err) {
                    if (err) {
                        console.log('--- Errors! ---')
                        console.log(user)
                        for (var key in err.errors) {
                            req.flash('registration', err.errors[key].message);
                        }
                        res.redirect('/');
                    } else {
                        console.log('--- Added a new user to the database: ---');
                        console.log(user)
                        req.session.user_id = user._id;
                        console.log('REQ.SESSION. = ', req.session.user_id);
                        res.redirect('/dash');
                    }
                })
            }
        });
    });
});

// Process user's login credentials.
app.post('/login', function (req, res) {
    console.log('--- Login post request ---');
    if (!req.body.name  || !req.body.password){
        req.flash('pwErrors', 'Fields cannot be left blank.');
    }
    User.findOne({email: req.body.email}, function (err, user) { // Check if email is tied to an account.
        if (!user) { // No match for email in db. 
            console.log('--- Could not find user in the database.---');
            console.log(req.body)
            res.redirect('/')
        } else { // Email has a match/user exists
            console.log('--- Email exists in DB. ---')
            console.log(user)
            if (user){
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (result) { // Passwords match
                        console.log('--- Passwords match ---');
                        req.session.user_id = user._id;
                        res.redirect('/dash')
                    } else {
                        console.log('--- Passwords do not match ---');
                        req.flash('pwErrors', 'Something went wrong with your login attempt.')
                        res.redirect('/')
                    }
                });
            }
        }
    });
})

// Route logged-in users to the dashboard.
app.get('/dash', function (req, res) {
    if (req.session.user_id) {
        User.find({
            _id: req.session.user_id
        }, function (err, user) {
            console.log(user);
            if (err) {
                console.log('--- Could not find user. ---');
            } else {
                console.log('--- Found the user. ---');
                user = user;
                res.render('dash', {
                    user: user
                })
            }
        })
    } else {
        console.log('User is not logged in and tried to access /dash');
        res.redirect('/');
    }
})