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

app.get('/', function (req, res) {
    req.session.count++;
    if (!req.session.count) {
        req.session.count = 1;
    }
    res.render("index", {
        count: req.session.count
    });
})

app.post('/clear', function(req, res){
    req.session.destroy();
    res.redirect('/');
})

app.post('/addTwo', function(req, res){
    req.session.count+=1;
    res.redirect('/');
})

app.listen(8000, function () {
    console.log("listening on port 8000");
});