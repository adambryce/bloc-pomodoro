var blocPomodoro = angular.module('blocPomodoro', ['ui.router', 'firebase']);


blocPomodoro.config(function($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
             });
         
        $stateProvider
            .state('landing', {
                url: '/',
                controller: 'LandingCtrl',
                templateUrl: '/templates/landing.html'
            })
         
            .state('second', {
                url: '/',
                templateUrl: '/templates/second.html'
            });
});

