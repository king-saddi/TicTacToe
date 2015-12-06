/* 

// trying to get angular-ui-router to work, not working


angular.module('ticTacToeApp', [
        'ui.router',
        'game'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('game', {
                url: '/',
                views: {
                    'game': {
                        controller: 'ticController as toe',
                        templateUrl: 'game/game.tmpl.html'
                    }
                }
            });
        // initial and fallback rewrite
        $urlRouterProvider.otherwise('/');
    });
    
    */