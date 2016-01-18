var app = angular.module("techTalentAsia", [
	'ngRoute',
	'ngSanitize',
	'satellizer'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
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
            controllerAs: 'login'
        })
        .linkedin({
            clientId: '75ryg9srtbrqr1'
        })
        .when('/auth/signup', {
            controller: 'AuthController',
            templateUrl: 'views/site/signup.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);