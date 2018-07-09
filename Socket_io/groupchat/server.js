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

// ---------- Socket.io ----------
const io = require('socket.io')(server);
session.userId = 1;
var users = [];
var msgs = [];
io.on('connection', function (socket) {

    // Take new user's name and pass them the existing message log.
    socket.on('newUser', function(data){
        var newUser = {name: data.name, userId: session.userId};
        users.push(newUser);
        console.log(newUser);
        socket.emit('msgLog', {msgs:msgs});
    })

    // Add new messages to msgs. Send the new message to everyone.
    socket.on('newMsg', function(data){
        console.log(data);
        msgs.push(data);
        console.log({thisdata:data});
        io.emit('getNewMsg', data)
    })
});

// ---------- Static Views ----------
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render('index');
})
