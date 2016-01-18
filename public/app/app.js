var app = angular.module("techTalentAsia", [
	'ngRoute',
	'ngSanitize',
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode(true);
	}
	
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
}]);