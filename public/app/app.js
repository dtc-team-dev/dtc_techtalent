var app = angular.module("techTalentAsia", [
	'ngRoute',
	'ngSanitize'
]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'SiteController',
			templateUrl: 'views/site/main.html'
		})
		.when('/', {
			controller: 'AuthController',
			templateUrl: 'views/site/login.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});