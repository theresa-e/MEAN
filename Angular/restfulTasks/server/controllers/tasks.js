const mongoose = require('mongoose');
var Task = mongoose.model('Task');
require('../models/task.js')

module.exports = {
    // Retrieve all tasks.
    allTasks: (req, res) => {
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
    },

    // Retrieve task by ID.
    findTask: (req, res) => {
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
    },

    // Create a task
    createTask: (req, res) => {
        var task = new Task({
            title: req.body.title,
            description: req.body.description,
            completed: false
        })
        task.save(function (err) {
            if (err) {
                console.log('------- Error: Could not save this task.');
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
    },

    // Update by ID
    updateTask: (req, res) => {
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
    },

    // Delete task by ID.
    deleteTask: (req, res) => {
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
    }
}