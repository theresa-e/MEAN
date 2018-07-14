var path = require("path")

/* ---------- Express ---------- */
const express = require('express');
const app = express();
const server = app.listen(7000);
console.log("Running at port 7000...");

/* ---------- Body Parser ---------- */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // Configure to read JSON data
app.use(bodyParser.urlencoded({
    extended: true
}));

/* ---------- Mongoose ---------- */
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restfulTask');
mongoose.Promise = global.Promise;
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
mongoose.model('Task', TaskSchema)
var Task = mongoose.model('Task');

/* ---------- Routing ---------- */

// Retrieve all tasks
app.get('/tasks', function (req, res) {
    Task.find({}, function (err, tasks) {
        if (err) {
            console.log("------- Error: Could not retrieve all tasks.");
            res.json({
                message: "Error",
                error: err
            });
        } else {
            res.json({
                message: "Success",
                tasks: tasks
            });
        }
    })
});

// Retrieve a Task by ID
app.get('/tasks/:id', (req, res) => {
    console.log(req.params.id)
    Task.findOne({
        _id: req.params.id
    }, (err, task) => {
        if (err) {
            console.log('------- Error: Could not find user by that name.');
            res.json({
                message: "Error",
                errors: err
            });
        } else {
            console.log('------- Success: Found user by ID.')
            console.log(task);
            res.json({
                message: "Success",
                foundTask: task
            });
        }
    })
})

// Create a task
app.post('/tasks', (req, res) => {
    var task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: false
    })
    task.save(function (err) {
        if (err) {
            console.log('------- Error: Could not save this user.');
            console.log(task);
            res.json({
                message: "Error",
                error: err
            });
        } else {
            res.json({
                message: "Successfully added task!",
                new_task: task
            });
        }
    })
})

// Update task by ID
app.put('/tasks/:id', (req, res) => {
    Task.findOne({
        _id: req.params.id
    }, (err, task) => {
        console.log(task)
        if (err) {
            console.log('------ Errors: Could not find task by ID.')
            res.json({
                message: "Error"
            })
        } else {
            console.log('------REQ BODY: ', req.body);
            task.title = req.body.title;
            task.description = req.body.description;
            task.completed = req.body.completed;
            task.save((err) => {
                if (err) {
                    console.log('udpated task', task)
                    console.log('------ Error: Could not save new task info.');
                    res.json({
                        message: "Errors"
                    })
                } else {
                    res.json({
                        message: "Task has been updated.",
                        task: task
                    })
                }
            })
        }
    })
})

// Delete task by ID
app.delete('/tasks/:id/', (req, res) => {
    console.log(req.params.id)
    Task.findOneAndRemove({
        _id: req.params.id
    }, function (err, task) {
        if (err) {
            console.log('------- Error: Could not remove task.');
            res.json({
                message: "Errors",
                errors: err
            })
        } else {
            console.log('------- Success: Found task by id.');
            res.json({
                message: "Success!",
            })
        }
    });
})
