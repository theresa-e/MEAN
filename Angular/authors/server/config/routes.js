const mongoose = require('mongoose');
var Author = mongoose.model('Author');
var authorCtrl = require('../controllers/authors');

module.exports = function (app) {
    console.log('posted')
    app.post('/authors', (req, res) => {
        authorCtrl.createAuthor(req, res);
    })
}