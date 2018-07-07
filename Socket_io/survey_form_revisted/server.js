const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var path = require("path");
app.use(express.static(__dirname + "/static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const server = app.listen(1337);

const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function (socket) { //2

    socket.on('surveyResults', function (data) { 
        console.log(data); 
        var randomNum = Math.floor((Math.random() * 1000) + 1);
        data.randomNum = randomNum;
        socket.emit('response', data)
    });
});

//route to main page
app.get('/', function(req, res){
    res.render("survey");
})