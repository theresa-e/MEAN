const golds = require('./../controllers/goldController.js');
// const mongoose = require('mongoose');

module.exports = function (app){

    // Retrieve amount of gold
    app.get('/gold', golds.getGold);

    // When user clicks 'new game' button, a new game is created. 
    app.post('/gold', golds.createGold);

}
