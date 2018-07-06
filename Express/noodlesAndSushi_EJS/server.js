var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static")); // allows us to access static content (imgs, css, js) in static folder
app.set('views', __dirname + '/views'); // access and render files in the view
app.set('view engine', 'ejs');

app.get('/', function (request, response) {   
    response.render('index'); // find out why we don't need to specify file type --> ex. "index.ejs"
});

app.get('/sushi', function (request, response) {
    response.render('sushi');
});

app.get('/sushi/caliroll', function (request, response) {
    var caliRoll = [{
        name: "California Roll",
        ingredients: ['Rice', 'imitation crab', 'nori'],
        price: "$9.95",
        id: 1
    }]
    response.render('sushi-info', {
        info: caliRoll
    });
});

app.get('/sushi/dragon', function (request, response) {
    var dragon = [{
        name: "Dragon Roll",
        ingredients: ['Rice', 'imitation crab', 'nori', 'spicy mayo', 'salmon', 'avocado'],
        price: "$12.95",
        id: 2
    }]
    response.render('sushi-info', {
        info: dragon
    });
});

app.get('/sushi/veggie', function (request, response) {
    var dragon = [{
        name: "Veggie Tempura",
        ingredients: ['Rice', 'toasted sesame seeds', 'asparagus', 'carrots'],
        price: "$10.95",
        id: 3
    }]
    response.render('sushi-info', {
        info: dragon
    });
});


app.get('/noodles', function (request, response) {
    response.render('noodles');
})

app.get('/cars/new', function (request, response) {
    response.render('form');
});

app.listen(7000, function () {
    console.log("listening on port 7000");
});