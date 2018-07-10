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

mongoose.connect('mongodb://localhost/quotes_mongoose');
mongoose.Promise = global.Promise;
var QuoteSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    name: {type: String},
    quote: {type: String}
}, {timestamps:true})
mongoose.model('Quote', QuoteSchema) 
var Quote = mongoose.model('Quote');

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
    res.render('index');
})

app.get('/add', function (req, res){
    res.render('add');
})
app.get('/quotes', function (req, res){
    Quote.find({}, function(err, quotes){
        if(err){
            console.log("Error -- could not retrieve all quotes.")
        } else {
            existingQuotes = quotes;
            console.log("Successfully retrieved quotes:");
            console.log(existingQuotes);
            res.render('quotes', {quotes: existingQuotes});
        }
    })
})

app.post('/quotes', function (req, res) {
    console.log("Post Data :", req.body);
    var quote = new Quote({
        name: req.body.name,
        quote: req.body.quote
    });
    // Create a new quote and save to database.
    quote.save(function (err) {
        if (err) {
            console.log("Error - please check form submission.");
        } else {
            console.log("Added a new quote to database:");
            console.log(quote);
            res.redirect('/quotes');
        }
    })
});