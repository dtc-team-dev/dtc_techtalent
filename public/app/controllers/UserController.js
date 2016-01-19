'use strict';
app.controller('UserController', function($rootScope, $scope, $location, $auth, $window, Login, toastr, Account){
	var vm = this,
        now = new Date(),
        exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());//expired next year

    vm.loggedIn = Login.isLoggedIn();

	$scope.email = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.username = /^[a-z0-9]+$/;

    $scope.remember = {
        me: true
    };

    vm.isAuthenticated = function () {
        return $auth.isAuthenticated();
    };

    vm.authenticate = function (provider) {
        $auth.authenticate(provider);
    };

    if (Login.getEmailCookie('email')) {
        vm.user = {
            'email': atob(Login.getEmailCookie('email')),
            'password': atob(Login.getEmailCookie('password'))
        };
    }

    //get User after login
    Login.getUser()
        .then(function (users) {
        vm.user = users.data;
    });

    /* Proses Login */
    vm.submit = function () {
        vm.processing = true;

        vm.error = '';
        if (vm.user === undefined) {
            /*alert('Data Tidak Boleh Kosong');*/
            console.log("Data Tidak Boleh Kosong");
        } else {

            if ($scope.remember.me === false) {
                Login.forget('email');
                Login.forget('password');
            } else {
                Login.remember('email', btoa(vm.user.email));
                Login.remember('password', btoa(vm.user.password));
            }

            Login.login(vm.user.email, vm.user.password)
                .success(function (users) {
                    vm.processing = false;

                    Login.getUser()
                        .then(function (users) {
                            vm.user = users.data;
                        });

                    if (users.success) {
                        $location.path('/');

                    } else {
                        vm.error = users.message;
                        alert(vm.error);
                    }
                });
        }
    };

    //Function Klik untuk Logout
    vm.logout = function () {
        Login.logout();
        $window.location.reload();
    };

	vm.createUser = function(){
		UserCreate.create(vm.user)
			.success(function(data){
				if(data.success){
					$window.location.reload();
				}else{
					console.log(data.message);
				}
			});
	};
	vm.signup = function() {
		$auth.signup(vm.user)
			.then(function(response) {
				$auth.setToken(response.data.token);
				$location.path('/');
				toastr.info(response.data.message);
			})
			.catch(function(response) {
				toastr.error(response.data.message);
			});
	};
});

