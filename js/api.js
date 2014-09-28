var webApp = angular.module('webApp', ['ngRoute', 'ngProgress', 'ngAnimate', 'ngTouch']);

webApp.config(function($routeProvider){
	$routeProvider
	.when( '/',
			{
				title: 'Login',
				templateUrl: 'js/view/login.html'
			}	
		)
	.when( '/signup',
			{
				title: 'Sign up',
				templateUrl: 'js/view/signup.html'
			}	
		)
	.when( '/userlist',
			{
				title: 'User List',
				templateUrl: 'js/view/userlist.html'
			}	
		)
	.when( '/photo-gallery',
			{
				title: 'Photo Gallery',
				templateUrl: 'js/view/photo-gallery.html'
			}	
		)
	.otherwise({ redirectTo : '/' });
});