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
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/site/login.html',
            controllerAs: 'login'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    $authProvider.google({
        clientId: '573705101198-n8c90t5cueecj4pc5d893gbatqbcl5al.apps.googleusercontent.com',
        url: 'api/auth/google',
        redirectUri: window.location.origin
    });

    $authProvider.linkedin({
        clientId: '75ryg9srtbrqr1',
        url: 'api/auth/linkedin',
        redirectUri: window.location.origin
    });

    /*$authProvider.facebook({
     clientId: '1690330761186585'
     });*/

    /*$authProvider.github({
        clientId: 'GitHub Client ID'
    });*/
    /*$authProvider.instagram({
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
    });*/

    // No additional setup required for Twitter

    /*$authProvider.oauth2({
        name: 'foursquare',
        url: '/auth/foursquare',
        clientId: 'Foursquare Client ID',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });*/

    /*$authProvider.facebook({
        name: 'facebook',
        url: '/auth/facebook',
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        redirectUri: window.location.origin + '/',
        requiredUrlParams: ['display', 'scope'],
        scope: ['email'],
        scopeDelimiter: ',',
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 580, height: 400 }
    });*/

    // Google
    /*$authProvider.google({
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        redirectUri: window.location.origin,
        requiredUrlParams: ['scope'],
        optionalUrlParams: ['display'],
        scope: ['profile', 'email'],
        scopePrefix: 'openid',
        scopeDelimiter: ' ',
        display: 'popup',
        type: '2.0',
        popupOptions: { width: 452, height: 633 }
    });*/
    // LinkedIn
    /*$authProvider.linkedin({
        url: '/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        redirectUri: window.location.origin,
        requiredUrlParams: ['state'],
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        state: 'STATE',
        type: '2.0',
        popupOptions: { width: 527, height: 582 }
    });*/

}]);
