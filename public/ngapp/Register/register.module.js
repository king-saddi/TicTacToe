angular.module('register', [
        'shared.register.service'
    ])
    .controller('userController', ['UserService', function(UserService) {
        var user = this;
        user.user = {};     // making it a JSON object so we can send it using $http
        user.registerFlag = true;
        user.matchFlag = false;
        
        user.registerUser = function(){
            
                UserService.validateUser(user.user).then(function(res) {
                    if (!res){
                        UserService.addUser(user.user);
                        alert('Succesfully registered your username: ');
                        user.registerFlag = false;
                        user.matchFlag = true;
                    }
                    else{
                        alert('[INFO: Welcome back ' + user.user.username + ']');
                        user.registerFlag = false;
                        user.matchFlag = true;
                    }
                });
                
            };
    
        user.matchPlayers = function(){
            if (user.user.username == user.opponent.username) {
                alert("[ERROR: Sorry " + user.user.username + " you cannot play against yourself.");
            }
            else {
                // validate, if opponent exists
                UserService.validateUser(user.opponent).then(function(res) {
                    if (!res) {
                        alert("[ERROR: User name " + user.opponent.username + "is invalid. Please enter a different opponent");
                    }                 
                    else {
                        alert("Succesful Match!");
                        alert("INFO: Initiating game between " + user.user.username + " & " + user.opponent.username);
                        user.matchFlag = false;
                        user.startFlag = true;
                        UserService.setFlag(user.startFlag);
                    }
                });
            }
        };
        
}]);