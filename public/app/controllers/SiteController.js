app.controller('SiteController', function($scope,$auth) {
    var vm = this;
    vm.isAuthenticated = function(){
        return $auth.isAuthenticated();
    };
});
