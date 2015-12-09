angular.module('shared.register.service', [
    
])

.factory('UserService', ['$http', function($http) {
  var currentUsers ={};

  var grabUsers = function() {
    return $http.get('/test')
      .then(function(res) {
        currentUsers = res.data;
        console.log('Inside grabUsers function, grabbing data from mongo');
        console.log('Current users in mongo: ', currentUsers);
    }, function(errResponse) {
      console.error('users query error');
    });
  };

  return {
    addUser: function(user) {
      console.log('Inside addUser function, adding: ' + user);
      $http.post('/test', user);
    },
    getUser: function(){
      return grabUsers();
    }
  };
    
}]);