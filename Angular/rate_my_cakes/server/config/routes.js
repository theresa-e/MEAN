const mongoose = require('mongoose');
var Cake = mongoose.model('Cake');
const cakes = require('./../controllers/cakes.js')

module.exports = function (app) {
    app.post('/cakes', (req, res) => {
        console.log('ROUTES.JS -----> New cake created.');
        cakes.createCake(req, res);
    })

    app.get('/cakes', (req, res) => {
        console.log('ROUTES.JS -----> Retrieving all cakes');
        cakes.getAll(req, res);
    })

    app.get('/cakes/:id', (req, res) => {
        cakes.findCake(req, res);
    })

    app.post('/cakes/:id', (req, res) => {
        cakes.addRating(req, res);
    })
}