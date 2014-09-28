var controllers = {};


controllers.MyTabCtrl = function($scope, $location, ngProgress) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
    ngProgress.start();
    ngProgress.complete();
};

controllers.userController = function($scope){
	$scope.countries = [{id: '1', name: 'India'},
		{id: '2', name: 'New York'},
		{id: '3', name: 'Pakistan'},
		{id: '4', name: 'China'}
	];
};

controllers.UserList = function($scope, $http) {
  $http.get('js/jsonData.json').
    success(function(data, status, headers, config) {
    	console.log(data);
      	$scope.listData = data;
    }).
    error(function(data, status, headers, config) {
      // log error
    });
};


webApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

webApp.controller(controllers);