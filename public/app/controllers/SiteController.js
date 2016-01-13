app.controller('SiteController', function($scope, $routeParams, $location) {

	$scope.isActive = function(route) {
		return route === $location.path();
	}

	$scope.photos = [
		{
			url: "assets/img/gallery/1.jpg",
			title: "Hello, I'm Gifa a Web Designer"
		},
		{
			url: "assets/img/gallery/2.jpg",
			title: "Are you wanna build a website?"
		},
		{
			url: "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/canada.jpg",
			title: "Canada"
		},
		{
			url: "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/alps.jpg",
			title: "Alps"
		},
		{
			url: "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/elk.jpg",
			title: "Elk"
		},
		{
			url: "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/france.jpg",
			title: "France"
		},
		{
			url: "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/gray-fields.jpg",
			title: "Gray Fields"
		},
		{
			url: "https://s3.amazonaws.com/codecademy-content/courses/ltp4/photos-api/lake.jpg",
			title: "Lake"
		}
	];

});