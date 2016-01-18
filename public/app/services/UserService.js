app

.factory('UserCreate', function($http){
	var userFactory = {};

	userFactory.create = function(userData){
		return $http.post('/user/sendReq', userData);

	}

	return userFactory;

})