const mongoose = require('mongoose');
require('../models/author.js');
var Author = mongoose.model('Author');

module.exports = {
    // Create a new author
    createAuthor: (req, res) => {
        var author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        })
        author.save((err) => {
            if (err) {
                console.log('------- Error: Could not save this author.');
                console.log(author);
                res.json({
                    message: "Error",
                    error: err
                });
            } else {
                res.json({
                    message: "Success",
                    new_author: author
                });
            }
        });
    }
}