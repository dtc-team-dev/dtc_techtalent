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
		.otherwise({
			redirectTo: '/'
		});
});