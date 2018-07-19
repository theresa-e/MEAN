const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rateMyCakes');
var CakeSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint)
    name: {
        type: String,
        required: [true, "Enter a valid cake name"],
        minLength: 5
    },
    bakersName: {
        type: String,
        required: [true, "Enter a valid baker's name."],
        minLength: 2
    },
    imageURL: {
        type: String,
        required: true
    },
    ratings: {
        type: Array
    },
    comments: {
        type: Array
    }
}, {
    timestamps: true
});

mongoose.model('Cake', CakeSchema);
