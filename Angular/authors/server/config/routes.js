const mongoose = require('mongoose');
const authors = require('./../controllers/authors.js');
var Author = mongoose.model('Author');
var Quote = mongoose.model('Quote');
mongoose.Promise = global.Promise;
var authorCtrl = require('../controllers/authors');

module.exports = function (app) {
    app.post('/authors', (req, res) => {
        authorCtrl.createAuthor(req, res);
    })
}