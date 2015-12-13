// app.js - all js code goes here
'use strict';

angular.module('gameApp', [
    'ui.router',
    'game',
    'register'
    ])

.config(function($stateProvider, $urlRouterProvider) {
    
        $stateProvider
            .state('GameBoard', {
                url: '/',
                views: {
                    'register': {
                        controller: 'userController as user',
                        templateUrl: 'ngapp/Register/register.tmpl.html'
                    },
                    'game': {
                        controller: 'ticController as toe',
                        templateUrl: 'ngapp/Board/game.tmpl.html'
                    },
                    'chat': {
                        templateUrl: 'ngapp/Chat/chat.tmpl.html'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
});
