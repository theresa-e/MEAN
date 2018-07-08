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
    var count = 0;

    // increment count
    socket.on('increase', function (data) {
        count++;
        var updatedCount = {count: count}
        socket.emit('updatedCount', updatedCount);
    });

    // reset count to 0
    socket.on('reset', function(data){
        count = 0;
        var updatedCount = {count: count}
        socket.emit('zeroCount', updatedCount);
    })
});

// ---------- Static Views ----------
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render('index');
})
