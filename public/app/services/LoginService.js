app

/*factory untuk Login*/
.factory('Login', function($http, $q, CekToken) {

	var cekFactory = {};

	/*function login untuk menghubungkan ke userApi*/
	cekFactory.login = function(email, password) {
		return $http.post('/user/login', {
			email: email,
			password: password
		})
		.success(function(data) {
			CekToken.setToken(data.token);
			return data;
		})
	}

	/*function Logout untuk setting token*/
	cekFactory.logout = function() {
		CekToken.setToken();
	}

	/*function mengecek ketika user telah login*/
	cekFactory.isLoggedIn = function() {
		if(CekToken.getToken())
			return true;
		else
			return false;
	}

	/*function untuk mendapatkan akun ketika login*/
	cekFactory.getUser = function() {
		if(CekToken.getToken()){
			return $http.get('/user/getuser/'+CekToken.getToken());
		}else{
			return $q.reject({ message: "User has no token"});
		}

	}

	return cekFactory;

})


.factory('CekToken', function($window) {

	var cekTokenFactory = {};

	/*function untuk mengambil nilai token yang telah di simpan di localStorage*/
	cekTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	}

	/*function untuk setting nilai token pada localstorage*/
	cekTokenFactory.setToken = function(token) {
		if(token)
			$window.localStorage.setItem('token', token);
		else
			$window.localStorage.removeItem('token');
	}

	return cekTokenFactory;

})


/*.factory('AuthInterceptor', function($q, $location, CekToken) {

	var interceptorFactory = {};


	interceptorFactory.request = function(config) {

		var token = CekToken.getToken();

		if(token) {

			config.headers['x-access-token'] = token;
		}
		return config;
	};

	
	return interceptorFactory;
});
*/

