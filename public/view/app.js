var routerApp = angular.module('gameApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/register');
    
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'view/register.tmpl.html',
			controller: '/controller/register.module.js'
        })
		
        .state('game', {
            url: '/game',
            templateUrl: 'view/game.tmpl.html',
			controller: '/controller/game.module.js'
        });
        
});