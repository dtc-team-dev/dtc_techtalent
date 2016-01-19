/*app.controller('AuthController', function($scope, $routeParams, $location) {
    $scope.authenticate = function(provider){
        $routeParams.authenticate(provider);
    }
});*/
'use strict';
app.controller('AuthController', function($scope, $location, $auth, toastr) {
    $scope.signup = function() {
        $auth.signup($scope.user)
            .then(function(response) {
                $auth.setToken(response);
                $location.path('/');
                toastr.info('You have successfully created a new account and have been signed-in');
            })
            .catch(function(response) {
                toastr.error(response.data.message);
            });
    };
    $scope.authenticate = function(provider){
        $auth.authenticate(provider);
    }
});
