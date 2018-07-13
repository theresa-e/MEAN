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

mongoose.connect('mongodb://localhost/elephantCRUD');
mongoose.Promise = global.Promise;
var ElephantSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    name: {
        type: String
    },
    age: {
        type: Number
    }
}, {
    timestamps: true
})
mongoose.model('Elephant', ElephantSchema)
var Elephant = mongoose.model('Elephant');

// ---------- Routing ----------

// Find all elephants from database and pass to index.ejs.
app.get('/', function (req, res) {
    Elephant.find({}, function (err, elephants) {
        if (err) {
            console.log("Error -- could not retrieve all elephants.")
        } else {
            elephantList = elephants;
            console.log("Successfully retrieved elephants:");
            console.log(elephantList);
            res.render('index', {
                elephants: elephantList
            });
        }
    })
})

// Find info on a specific elephant based on ID.
app.get('/elephants/:id', function (req, res) {
    Elephant.find({
        _id: req.params.id
    }, function (err, elephant) {
        if (err) {
            console.log("Error -- could not retrieve info on this elephant.")
        } else {
            elephantInfo = elephant;
            console.log('elephant info', elephantInfo);
            res.render('info', {
                elephant: elephantInfo
            });
        }
    })
});

// Route to new elephant form.
app.get('/add', function (req, res) {
    res.render('add');
});

// Create new elephant.
app.post('/elephants', function (req, res) {
    console.log("Post Data :", req.body);
    var elephant = new Elephant({
        name: req.body.name,
        age: req.body.age
    });
    // Create a new elephant and save to database.
    elephant.save(function (err) {
        if (err) {
            console.log("Error - please check form submission.");
        } else {
            console.log("Added a new quote to database:");
            console.log(elephant);
            res.redirect('/');
        }
    })
});

// Delete an elephant from the database
app.post('/delete/:id', function (req, res) {
    Elephant.find({_id: req.params.id}).remove().exec(); // .exec() executes the query
    res.redirect('/')
});

// Route to form to edit elephant, prepopulate form.
app.post('/edit/:id', function (req, res) {
    Elephant.find({_id: req.params.id}, function(err, elephant){
        if (err){
            console.log("Error - couldn't find elephant to update.");
        } else {
            res.render("edit", {elephant:elephant});
        }
    }); 
});

// Update/submit elephant document. 
app.post('/update/:id', function (req, res) {
    console.log('request.body: ', req.body)
    console.log('request params id ', req.params.id)
    Elephant.updateOne({_id: req.params.id}, {$set: {name: req.body.name, age: req.body.age}}, function(err, result){
        if (err){
            throw err;
        }
    });
    res.redirect('/');
});
