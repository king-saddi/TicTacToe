angular.module('shared.register.service', [])
.factory('UserService', ['$http', function($http) {
    var startFlag = false;
    
    
  return {
    getAllUsers: function(){
      return $http.get('/test')
      .then(function(res) {
            console.log('User list: ', res.data);
        }, function(errResponse) {
          console.error('Error getting the users');
        });
    },
    validateUser: function(user){
      return $http.get('/test')
      .then(function(res) {
          for (var i = 0; i < res.data.length; i++){
                if(res.data[i].username == user.username)
                    return true;
                }
          console.log('[INFO: User ' + user.username + ' was not in the db]');
          return false;
        }, function(errResponse) {
          console.error('[ERROR: getting users]');
        });
    },
    addUser: function(user){
      return $http.get('/test')
      .then(function(res) {
              console.log('[INFO: new user ' + user.username + ' was successfully added to KSKS app]');
              $http.post('/test', user);
        }, function(errResponse) {
            console.error('[ERROR: adding user]');
        });
    },
    setFlag : function(flag){
        startFlag = flag;
        console.log('flag is now: ' + startFlag);
    },
    getFlag : function(){
        return startFlag;
        
    },
    startFlag : startFlag
      
  };
    
}]);