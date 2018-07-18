const mongoose = require('mongoose');
require('../models/gold.js');
var Gold = mongoose.model('Gold');

module.exports = {
    getGold: (req, res) => {
        Gold.find({}, (err, gold) => {
            if (err) {
                console.log("------ Error: Could not retrieve gold.");
                res.json({
                    message: "Error",
                    error: err
                });
            } else {
                res.json({
                    message: "Success",
                    gold: res
                });
            }
        })
    },

    createGold: (req, res) => {
        var gold = new Gold();
        gold.gold = req.body.gold;
        gold.message = req.body.message;
        gold.save(function (err) {
            if (err) {
                console.log('------- Error: Could not create a new game.');
                res.json({
                    message: "Error",
                    error: err
                });
            } else {
                res.json({
                    message: "Successfully created new game.",
                    gold: gold
                })
            }
        })
    }
}