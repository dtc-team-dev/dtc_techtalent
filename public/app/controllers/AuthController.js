/*app.controller('AuthController', function($scope, $routeParams, $location) {
    $scope.authenticate = function(provider){
        $routeParams.authenticate(provider);
    }
});*/
app.controller('AuthController', function($scope, $auth) {
    $scope.authenticate = function(provider){
        $auth.authenticate(provider);
    }
});
