app

.controller('LoginController', function($scope, $location, $window, Login) {

	var vm = this,
		now = new Date(),
		exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate()); /*expired next year*/

	vm.loggedIn = Login.isLoggedIn();

	$scope.remember = {
		me : true
	}		

	if(Login.getEmailCookie('email')){
		vm.loginData = {
			'email' : atob(Login.getEmailCookie('email')),
			'password' : atob(Login.getEmailCookie('password'))
		};
	}

	/*get User after login*/
	Login.getUser()
		.then(function(data) {
			vm.user = data.data;
		});

	/*Function Klik untuk Login*/
	vm.doLogin = function() {

		vm.processing = true;

		vm.error = '';
		if(vm.loginData === undefined){
			alert('Data Tidak Boleh Kosong');
		}else{

			if($scope.remember.me === false){
				Login.forget('email');
				Login.forget('password');				
			}else{
				Login.remember('email', btoa(vm.loginData.email));
				Login.remember('password', btoa(vm.loginData.password));
			}

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
		}
		
	};

	/*Function Klik untuk Logout*/
	vm.doLogout = function() {
		Login.logout();
		$window.location.reload();
	};

	vm.authenticate = function(provider) {
		$auth.authenticate(provider);
	};


});