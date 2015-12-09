// app.js - all js code goes here
var routerApp = angular.module('gameApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
        $stateProvider
            .state('GameBoard', {
                url: '/',
                views: {
                    'register': {
                        templateUrl: 'view/register.tmpl.html'
                    },
                    'game': {
                        templateUrl: 'view/game.tmpl.html'
                    },
                    'chat': {
                        templateUrl: 'view/chat.tmpl.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
})

.controller('userController', ['UserService', function(UserService) {
        var user = this;
        user.user = {};     // making it a JSON object so we can send it using $http
        
        user.register = function(){
            console.log('The user object is:' + user.user);
            UserService.addUser(user.user);
            UserService.getUser();
        }
}])

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
    
}])

.controller('ticController', [function() {
    var tic = this;
	tic.moves = 0;
	tic.rflag = false;
	tic.sflag = true;
	tic.player1 = "X";
	tic.player2 = "O";
	tic.currentPlayer = "";
	tic.board = {
		0:"",
		1:"",
		2:"",
		3:"",
		4:"",
		5:"",
		6:"",
		7:"",
		8:""
	};

	tic.resetBoard = function() {
		tic.board = {
		0:"",
		1:"",
		2:"",
		3:"",
		4:"",
		5:"",
		6:"",
		7:"",
		8:""
		};
        
        console.log('in resetBoard' + tic.board);
	}

	tic.start = function(){
		console.log('Started tic-tac-toe game.');
		tic.currentPlayer = tic.player1;
		tic.resetBoard();
		tic.sflag = false;
	};
	
	tic.restart = function(){
		console.log('Restarting tic-tac-toe game.');
		tic.currentPlayer = tic.player1;
		tic.resetBoard();
		tic.rflag = false;
	}

	tic.checkForWinner = function(){
		// horizontal wins
		if (
		((tic.board[0] == tic.board[1] && tic.board[1] == tic.board[2]) && tic.board[0] != "") || 
		((tic.board[3] == tic.board[4] && tic.board[4] == tic.board[5]) && tic.board[3] != "") || 
		((tic.board[6] == tic.board[7] && tic.board[7] == tic.board[8]) && tic.board[6] != "") || 
		// vertical wins
		((tic.board[0] == tic.board[3] && tic.board[3] == tic.board[6]) && tic.board[0] != "") || 
		((tic.board[1] == tic.board[4] && tic.board[4] == tic.board[7]) && tic.board[1] != "") || 
		((tic.board[2] == tic.board[5] && tic.board[5] == tic.board[8]) && tic.board[2] != "") || 
		// diagonal wins
		((tic.board[0] == tic.board[4] && tic.board[4] == tic.board[8]) && tic.board[0] != "") || 
		((tic.board[2] == tic.board[4] && tic.board[4] == tic.board[6]) && tic.board[2] != ""))
		{
			tic.win();
		}
		else if((tic.moves == 9)){
			tic.draw();
		}
	}
	
	tic.win = function() {
			alert("Player " + tic.currentPlayer + " won! Click restart to play again.");
			tic.moves = 0;
			tic.rflag = true;
	}
	
	tic.draw = function() {
			alert("DRAW! Click restart to play again.");
			tic.moves = 0;
			tic.rflag = true;
	}
	
	tic.select = function(loc) {
		//so that user can't click on an empty square if someone has won or the game hasn't started yet
		if(tic.sflag == true){
			alert("The game has not started. Click start to begin");
		} 
		else if(tic.rflag == true){
			alert("The game is over. Click restart to play again");
		}
		else{
			
			if(tic.board[loc] != "") {
				alert("Please choose a different position!");
			}

			else {
				tic.moves++;
				tic.board[loc] = tic.currentPlayer;

				if (tic.currentPlayer == tic.player1) {
					tic.checkForWinner();
					tic.currentPlayer = tic.player2;
				}
				else {
					tic.checkForWinner();
					tic.currentPlayer = tic.player1;
				}

			}
		}
	};
}]);