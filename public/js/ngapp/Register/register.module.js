angular.module('register', [
        'shared.register.service'
    ])
    .controller('userController', ['UserService', function(UserService) {
        var user = this;
        user.user = {};     // making it a JSON object so we can send it using $http
        
        user.register = function(){
            UserService.addUser(user.user);
        }
}]);