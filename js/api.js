var webApp = angular.module('webApp', ['ngRoute']);

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
	.otherwise({ redirectTo : '/' });
});