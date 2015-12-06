// app.js
var routerApp = angular.module('gameApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        .state('register', {
            url: '/register',
            templateUrl: 'view/register.tmpl.html'
        })
		
        .state('game', {
            url: '/game',
            templateUrl: 'view/game.tmpl.html'
        });
        
});