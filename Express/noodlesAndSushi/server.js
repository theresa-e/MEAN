var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static")); // allows us to access static content (imgs, css, js) in static folder

app.get('/', function (request, response){   
    response.sendfile('static/index.html');
})

app.get('/sushi', function (request, response){
    response.sendfile('static/sushi.html');
})

app.get('/noodles', function (request, response){
    response.sendfile('static/noodles.html');
})

app.get('/form', function (request, response){
    response.sendfile('static/form.html');
})

app.listen(8000, function () {
    console.log("listening on port 8000");
})
