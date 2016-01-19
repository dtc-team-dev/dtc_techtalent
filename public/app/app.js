var app = angular.module("techTalentAsia", [
    'ngRoute',
    'ngSanitize',
    'satellizer',
    'ngAnimate',
    'toastr'
]);

app.config(['$routeProvider', '$locationProvider', '$authProvider', function($routeProvider, $locationProvider, $authProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/site/main.html'
        })
        /*.when('/login', {
            controller: 'LoginController',
            templateUrl: 'views/site/login.html',
            controllerAs: 'login',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })*/
        .when('/login', {
            controller: 'UserController',
            templateUrl: 'views/site/login.html',
            controllerAs: 'login',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .when('/signup', {
            controller: 'AuthController',
            templateUrl: 'views/site/main.html',
            controllerAs: 'signup',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .when('/logout', {
            controller: 'LogoutController',
            templateUrl: 'views/site/logout.html',
            controllerAs: 'signup',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .when('/profile', {
            controller: 'ProfileController',
            templateUrl: 'views/site/profile.html',
            controllerAs: 'profile',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

    $authProvider.google({
        clientId: '573705101198-n8c90t5cueecj4pc5d893gbatqbcl5al.apps.googleusercontent.com',
        url: '/auth/google',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth'
    });

    $authProvider.linkedin({
        clientId: '75ryg9srtbrqr1',
        url: '/auth/linkedin',
        redirectUri: window.location.origin,
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization'
    });

    function skipIfLoggedIn($q, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
            deferred.resolve();
        } else {
            $location.path('/login');
        }
        return deferred.promise;
    }
}]);
