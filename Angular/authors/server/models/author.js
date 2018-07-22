const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
// Blueprint that defines the schema. 

var AuthorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name must be at least 3 chars long."],
        minlength: 3
    },
    quotes: []
}, {
    timestamps: true
});

mongoose.model('Author', AuthorSchema);