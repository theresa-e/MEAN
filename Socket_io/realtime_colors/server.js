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


// ---------- Socket.io ----------
const io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('purple', function(){
        io.emit('purpleBg');
    })
    socket.on('blue', function () {
        io.emit('blueBg');
    })
    socket.on('pink', function(){
        io.emit('pinkBg');
    })
});

// ---------- Static Views ----------
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render('index');
})