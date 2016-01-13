var app = angular.module("mediaSakti", [
	'ngRoute',
	'ngSanitize'
]);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			controller: 'SiteController',
			templateUrl: 'views/site/main.html',
			activetab: 'home'
		})
		.otherwise({
			redirectTo: '/'
		});
});