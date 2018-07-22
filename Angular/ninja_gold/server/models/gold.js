var mongoose = require('mongoose');

var GoldSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    gold: {
        type: Number
    },
    messages: {
        type: Array,
        required: [true, "Message length should be at least 3 chars long."],
        minLength: 3
    },
}, {
    timestamps: true
});

mongoose.model('Gold', GoldSchema)