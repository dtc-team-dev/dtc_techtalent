app.controller('LoginController', function ($rootScope, $scope, $location, $auth, $window, Login, toastr) {
    var vm = this,
        now = new Date(),
        exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
        //expired next year

    vm.loggedIn = Login.isLoggedIn();

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

    //Function Klik untuk Login
    vm.doLogin = function () {
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
    vm.doLogout = function () {
        Login.logout();
        $window.location.reload();
    };
});
/*app.controller('LoginController', function($scope, $location, $auth, toastr) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    $scope.login = function() {
        $auth.login($scope.user)
            .then(function() {
                toastr.success('You have successfully signed in!');
                $location.path('/');
            })
            .catch(function(error) {
                toastr.error(error.data.message, error.status);
            });
    };

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function() {
                toastr.success('You have successfully signed in with ' + provider + '!');
                $location.path('/');
            })
            .catch(function(error) {
                if (error.error) {
                    // Popup error - invalid redirect_uri, pressed cancel button, etc.
                    toastr.error(error.error);
                } else if (error.data) {
                    // HTTP response error from server
                    toastr.error(error.data.message, error.status);
                } else {
                    toastr.error(error);
                }
            });
    };
});*/
