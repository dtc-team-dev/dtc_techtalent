app.controller('LoginController', function($rootScope, $location, $window, Login) {

	var vm = this;

	vm.loggedIn = Login.isLoggedIn();

		Login.getUser()
			.then(function(data) {
				vm.user = data.data;
			});

	/*Function Klik untuk Login*/
	vm.doLogin = function() {

		vm.processing = true;

		vm.error = '';
		
		Login.login(vm.loginData.email, vm.loginData.password)
			.success(function(data) {
				vm.processing = false;

				Login.getUser()
					.then(function(data) {
						vm.user = data.data;
					});

				if(data.success){
					$location.path('/');
				}else{
					vm.error = data.message;
					alert(vm.error);
				}
			});
	};
	/*Function Klik untuk Logout*/
	vm.doLogout = function() {
		Login.logout();
		$window.location.reload();
	};

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider);
	};

});