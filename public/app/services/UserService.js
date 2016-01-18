app

.factory('UserCreate', function($http){
	var userFactory = {};

	userFactory.create = function(userData){
		return $http.post('/api/auth/signup', userData);

	};

	return userFactory;

});