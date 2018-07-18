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
    },

    // Update by ID
    updateTask: function (req, res) {
        console.log("I'm going to update", req.body);
        Task.findOneAndUpdate({
            _id: req.body._id
        }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                completed: req.body.completed
            }
        }, function (err, updatedTask) {
            // updatedTask.save(function (err, updatedTask){
            if (err) {
                console.log("Updating wasn't working my dear.", err);
                res.json({
                    message: "Error",
                    error: err
                });
            }
            if (updatedTask == null) {
                console.log("Your task is not found");
                res.json({
                    message: "Error"
                })
            } else {
                console.log("You're task is updated", updatedTask);
                res.json({
                    message: "Updated",
                    updatedTask: updatedTask
                });
            }
        });

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
    },

    editTask: (req, res) => {
        console.log('Edit Task clicked');
        console.log(req);
        Task.findByIdAndUpdate({_id: req.params.id}, editTask, (err, task) =>{
            if (err){
                console.log('----- Error: could not edit this task.')
                res.json({message: "Errors", errors: err})
            } else {
                console.log('----- Success: Task was edited!');
                res.json({message: "Success", task: task})
            }
        })
    }
}