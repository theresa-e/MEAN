const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/authors');
var QuoteSchema = new mongoose.Schema({
    quote: {
        type: String,
        required: [true, "Quote must be at least 3 chars long."],
        minLength: 3
    }
}, {
    timestamps: true
});

mongoose.model('Quote', QuoteSchema);