var mongoose = require('mongoose');

var GoldSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    gold: {
        type: Number
    },
    messages: {
        type: Array,
        required: true,
        minLength: 3
    },
}, {
    timestamps: true
});

mongoose.model('Gold', GoldSchema)