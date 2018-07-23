const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
mongoose.model('Author', AuthorSchema);

var AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name must be at least 3 chars long."],
        minlength: 3
    },
    lastName: {
        type: String,
        required: [true, "Last name must be at least 3 chars long."],
        minlength: 3
    }
}, {
    timestamps: true
});
