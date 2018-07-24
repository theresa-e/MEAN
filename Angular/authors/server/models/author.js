const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');

var AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter a first name."],
        minlength: [3, "First name must be at least 3 chars long."]
    },
    lastName: {
        type: String,
        required: [true, "Please enter a last name."],
        minlength: [3, "Last name must be at least 3 chars long."]
    }
}, {
    timestamps: true
});

mongoose.model('Author', AuthorSchema);