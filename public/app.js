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
	this.moves = 0;
	this.rflag = false;
	this.sflag = true;
	this.player1 = "X";
	this.player2 = "O";
	this.currentPlayer = "";
	this.board = {
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

	resetBoard = function() {
		this.board = {
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
        
        console.log('in resetBoard' + this.board);
	}

	this.start = function(){
		console.log('Started tic-tac-toe game.');
		this.currentPlayer = this.player1;
		resetBoard();
		this.sflag = false;
	};
	
	this.restart = function(){
		console.log('Restarting tic-tac-toe game.');
		this.currentPlayer = this.player1;
		resetBoard();
		this.rflag = false;
	}

	this.checkForWinner = function(){
		// horizontal wins
		if (
		((this.board[0] == this.board[1] && this.board[1] == this.board[2]) && this.board[0] != "") || 
		((this.board[3] == this.board[4] && this.board[4] == this.board[5]) && this.board[3] != "") || 
		((this.board[6] == this.board[7] && this.board[7] == this.board[8]) && this.board[6] != "") || 
		// verthisal wins
		((this.board[0] == this.board[3] && this.board[3] == this.board[6]) && this.board[0] != "") || 
		((this.board[1] == this.board[4] && this.board[4] == this.board[7]) && this.board[1] != "") || 
		((this.board[2] == this.board[5] && this.board[5] == this.board[8]) && this.board[2] != "") || 
		// diagonal wins
		((this.board[0] == this.board[4] && this.board[4] == this.board[8]) && this.board[0] != "") || 
		((this.board[2] == this.board[4] && this.board[4] == this.board[6]) && this.board[2] != ""))
		{
			this.win();
		}
		else if((this.moves == 9)){
			this.draw();
		}
	}
	
	this.win = function() {
			alert("Player " + this.currentPlayer + " won! Click restart to play again.");
			this.moves = 0;
			this.rflag = true;
	}
	
	this.draw = function() {
			alert("DRAW! Click restart to play again.");
			this.moves = 0;
			this.rflag = true;
	}
	
	this.select = function(loc) {
		//so that user can't click on an empty square if someone has won or the game hasn't started yet
		if(this.sflag == true){
			alert("The game has not started. Click start to begin");
		} 
		else if(this.rflag == true){
			alert("The game is over. Click restart to play again");
		}
		else{
			
			if(this.board[loc] != "") {
				alert("Please choose a different position!");
			}

			else {
				this.moves++;
				this.board[loc] = this.currentPlayer;

				if (this.currentPlayer == this.player1) {
					this.checkForWinner();
					this.currentPlayer = this.player2;
				}
				else {
					this.checkForWinner();
					this.currentPlayer = this.player1;
				}

			}
		}
	};
}]);