const mongoose = require('mongoose');
var Cake = mongoose.model('Cake');
require('../models/cake.js')

module.exports = {
    // Create a new cake
    createCake: (req, res) => {
        var cake = new Cake({
            name: req.body.name,
            bakersName: req.body.bakersName,
            imageURL: req.body.imageURL,
        })
        cake.save((err) => {
            if (err) {
                console.log('Error ---- Could not save this cake.');
                console.log(cake);
                res.json({
                    message: "Error",
                    error: err
                });
            } else {
                res.json({
                    message: "Successfully added cake!",
                    newCake: cake
                });
            }
        })
    },

    // Retrieves all cakes from database. 
    getAll: (req, res) => {
        Cake.find({}, (err, cakes) => {
            if (err) {
                console.log("Error ---- Could not find all cakes.");
                res.json({
                    message: "Error",
                    error: err
                });
            } else {
                res.json({
                    message: "Success",
                    cakes: cakes
                });
            }
        })
    },

    // Find cake info by ID
    findCake: (req, res) => {
        Cake.findOne({
            _id: req.params.id
        }, (err, cake) => {
            if (err) {
                console.log('Error ---- Could not find a cake by that ID.');
                res.json({
                    message: "Error",
                    errors: err
                });
            } else {
                console.log('Success ---- Found cake.');
                res.json({
                    message: "Success",
                    cake: cake
                });
            }
        })
    },


    addRating: (req, res) => {
        Cake.findOneAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                ratings: req.body.rating.value,
                comments: req.body.comment.text
            }
        }, (err, cake) => {
            if (err) {
                console.log('Error ---- Could not add rating.');
                res.json({
                    message: "Error",
                    error: err
                });
            } else {
                console.log('Success ---- Saved rating to cake.');
                res.json({
                    message: "Success",
                    cake: cake
                })
            }
        });
    }
}