var webApp = angular.module('webApp', ['ngRoute', 'ngProgress', 'ngAnimate', 'ngTouch', 'facebook']);

webApp.config(function($routeProvider, FacebookProvider){
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
	
	var myAppId = '859117657441517';
	
	FacebookProvider.init(myAppId);

});
