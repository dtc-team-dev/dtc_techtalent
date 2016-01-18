app

.controller('UserController', function(UserCreate, $window, $scope){
	var vm = this;

	$scope.email = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
	$scope.username = /^[a-z0-9]+$/;

	vm.CreateUser = function(){
		UserCreate.create(vm.createData)
			.success(function(data){
				if(data.success){
					$window.location.reload();
				}else{
					console.log(data.message);
				}
			});
	}
})