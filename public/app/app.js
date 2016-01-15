var app = angular.module("techTalentAsia", [
	'ngRoute',
	'ngSanitize'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			controller: 'SiteController',
			templateUrl: 'views/site/main.html'
		})
		.when('/login', {
			controller: 'AuthController',
			templateUrl: 'views/site/login.html'
		})
		.otherwise({
			redirectTo: '/'
		});

	$locationProvider.html5Mode(true);
}]);