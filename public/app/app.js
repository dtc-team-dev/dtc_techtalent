var app = angular.module("techTalentAsia", [
	'ngRoute',
	'ngSanitize',
	'satellizer'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/site/main.html',
		})
		.when('/auth/login', {
			controller: 'AuthController',
			templateUrl: 'views/site/login.html'
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
	/*$authProvider.httpInterceptor = function() { return true; };
	$authProvider.withCredentials = true;
	$authProvider.tokenRoot = null;
	$authProvider.cordova = false;
	$authProvider.baseUrl = '/';
	$authProvider.loginUrl = '/auth/login';
	$authProvider.signupUrl = '/auth/signup';
	$authProvider.unlinkUrl = '/auth/unlink/';
	$authProvider.tokenName = 'token';
	$authProvider.tokenPrefix = 'satellizer';
	$authProvider.authHeader = 'Authorization';
	$authProvider.authToken = 'Bearer';
	$authProvider.storageType = 'localStorage';*/
});