var express = require("express");
var session = require("express-session");
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: 'theresa',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// display survey page
app.get('/', function(req, res) {
    res.render("survey");
})

// process the survey
app.post('/process', function(req, res) {
    req.session.name = req.body.name;
    req.session.loc = req.body.location;
    req.session.lang = req.body.lang;
    req.session.cmts = req.body.comments;
    res.redirect('/results');
})

// display survey results
app.get('/results', function(req, res) {
    var results = req.session;
    res.render('results', {results : results});
})

app.listen(8000, function () {
    console.log("listening on port 8000");
});