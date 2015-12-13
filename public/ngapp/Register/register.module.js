angular.module('register', [
        'shared.register.service'
    ])
    .controller('userController', ['UserService', function(UserService) {
        var user = this;
        user.user = {};     // making it a JSON object so we can send it using $http
        
        user.register = function(){
            if (user.user.username == user.opponent.username) {
                alert("[ERROR: Sorry " + user.user.username + " you cannot play against yourself]");
            }
            else {
                // validate, if user exists. if not add the user
                UserService.validateUser(user.user).then(function(res) {
                    if (!res)
                        UserService.addUser(user.user);
                    else
                        console.log('[INFO: Welcome back ' + user.user.username + ']');
                });
                // validate, if opponent exists
                UserService.validateUser(user.opponent).then(function(res) {
                    if (!res) 
                        alert("[ERROR: User name " + user.opponent.username + "is invalid]");
                    else
                        alert("[INFO: Initiating game between " + user.user.username + " & " + user.opponent.username + "]");
                });
            }
        }
}]);