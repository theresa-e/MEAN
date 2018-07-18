const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restfulTask');
var TaskSchema = new mongoose.Schema({ // JS object that defines the schema (blueprint) 
    title: {
        type: String,
        required: true,
        minLength: 5
    },
    description: {
        type: String,
        required: true,
        minLength: 3
    },
    completed: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

mongoose.model('Task', TaskSchema);