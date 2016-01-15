var app = angular.module("techTalentAsia", [
	'ngRoute',
	'ngSanitize',
]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'LoginController',
			templateUrl: 'views/site/main.html',
			controllerAs: 'login'
		})
		.when('/login', {
			controller: 'LoginController',
			templateUrl: 'views/site/login.html',
			controllerAs: 'login'
		})
		.otherwise({
			redirectTo: '/'
		});
});