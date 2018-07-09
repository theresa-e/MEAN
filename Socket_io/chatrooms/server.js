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
io.on('connection', function (socket) {
    // Receive user's name and assign a userid (store in session).
    socket.on('new', function (data) {
        data.userId = session.userId;
        var newUser = {
            id: session.userId,
            name: data.name
        }
        users.push(newUser);
        session.userId++; // increment userId for next user.
        console.log('Current users: ', users)
        socket.emit('myUserInfo', {user:newUser}) // Send user info (with id) back to client.
        socket.broadcast.emit('newUserAdded', {newUser: newUser}) // Broadcast to other users that someone new is viewing the page.
        socket.emit('currentUsers', {users:users}); // Send logged in users to client that logged in.
    })
    socket.on('disconnect', function(data){
        var indexOfObj = users.indexOf(data[0]);
        socket.disconnect();
        users.splice(indexOfObj, 1); // remove user from users array.
        socket.broadcast.emit('userDisconnected', {userId:data[0].id}); // have clients remove user from page. 
    })
});

// ---------- Static Views ----------
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    res.render('index');
})

