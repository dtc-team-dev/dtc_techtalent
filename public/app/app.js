var app = angular.module("techTalentAsia", [
    'ngRoute',
    'ngSanitize',
    'satellizer'
]);

app.config(['$routeProvider', '$locationProvider', '$authProvider', function($routeProvider, $locationProvider, $authProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/site/main.html'
        })
        .when('/auth/login', {
            controller: 'AuthController',
            templateUrl: 'views/site/login.html'
        })
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/site/login.html',
            clientId: '75ryg9srtbrqr1',
            controllerAs: 'login'
        })
        .when('/auth/signup', {
            controller: 'AuthController',
            templateUrl: 'views/site/signup.html'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    $authProvider.facebook({
        clientId: 'Facebook App ID'
    });

    $authProvider.google({
        clientId: 'Google Client ID'
    });

    $authProvider.github({
        clientId: 'GitHub Client ID'
    });

    $authProvider.linkedin({
        clientId: '75ryg9srtbrqr1'
    });

    $authProvider.instagram({
        clientId: 'Instagram Client ID'
    });

    $authProvider.yahoo({
        clientId: 'Yahoo Client ID / Consumer Key'
    });

    $authProvider.live({
        clientId: 'Microsoft Client ID'
    });

    $authProvider.twitch({
        clientId: 'Twitch Client ID'
    });

    $authProvider.bitbucket({
        clientId: 'Bitbucket Client ID'
    });

    // No additional setup required for Twitter

    $authProvider.oauth2({
        name: 'foursquare',
        url: '/auth/foursquare',
        clientId: 'Foursquare Client ID',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    });

}]);
