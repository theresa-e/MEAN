const mongoose = require('mongoose');
var Task = mongoose.model('Task');
const tasks = require ('./../controllers/tasks.js')

module.exports = function (app) {
    // Retrieve all tasks
    app.get('/tasks', (req, res) => {
        console.log('Made it to routes.js!')
        tasks.allTasks(req, res);
    });

    // Retrieve a Task by ID
    app.get('/tasks/:id', (req, res) => {
        tasks.findTask(req, res);
    })

    // Create a task
    app.post('/tasks', (req, res) => {
        tasks.createTask(req, res);
    })

    // Update task by ID
    app.put('/tasks/:id', (req, res) => {
        tasks.createTask(req, res);
    })

    // Delete task by ID
    app.delete('/tasks/:id/', (req, res) => {
        tasks.deleteTask(req, res);
    })

}