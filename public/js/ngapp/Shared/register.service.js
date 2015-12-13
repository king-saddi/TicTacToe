angular.module('shared.register.service', [])
.factory('UserService', ['$http', function($http) {
  return {
    getAllUsers: function(){
      return $http.get('/test')
      .then(function(res) {
            console.log('User list: ', res.data);
        }, function(errResponse) {
          console.error('Error getting the users');
        });
    },
    addUser: function(user){
      return $http.get('/test')
      .then(function(res) {
          var flag = 0;
          for (var i = 0; i < res.data.length; i++) {
                if(res.data[i].username == user.username) {
                    flag = 1;
                }
          }
          if(flag) {
              console.log('Welcome back ' + user.username + '!');
          }
          else {
              console.log('NEW USER: ' + user.username + ' was successfully added to KSKS app!');
              $http.post('/test', user);
          }
        }, function(errResponse) {
          console.error('Error getting the users');
        });
    }
  };
    
}]);