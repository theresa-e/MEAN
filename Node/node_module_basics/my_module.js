module.exports = function(){
    return {
        greet: function(){
            console.log("we're now using a module!");
        },
        add: function(num1, num2){
            console.log("the sum is: ", num1 + num2);
        }
    }
}