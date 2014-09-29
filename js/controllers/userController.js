var controllers = {};


controllers.MyTabCtrl = function($scope, $location, ngProgress) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
    ngProgress.start();
    ngProgress.complete();
};

controllers.photoGallery = function($scope){
    $scope.photos = [
        {src: 'https://fbcdn-sphotos-c-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/10354233_10204975029603572_6605753444426132161_n.jpg?oh=ebd79bb5d8f61fe726bd840851c60173&oe=54C81985&__gda__=1418417043_d407acfbc794470ea64427b1788f4ea1', desc: 'Amit'},
        {src: 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/10475718_10204570845059211_8867214537307853817_n.jpg?oh=f39501c1ba28b9c8cb12d1adf68a2fd5&oe=54CDF0F3&__gda__=1422460812_8812049ee561208fe7d47f54a1d11cf3', desc: 'Amit'},
        {src: 'https://scontent-a-lhr.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/10458025_10204320990853012_6491620443430627007_n.jpg?oh=90f19fa76ba57404181bb1f16f4bc348&oe=5486C1B8', desc: 'Amit'},
        {src: 'https://fbcdn-sphotos-f-a.akamaihd.net/hphotos-ak-xpf1/v/t1.0-9/1743731_10203241937357349_205200911_n.jpg?oh=58b7fe180bdc70e15c33b3c4462c6b62&oe=5484E051&__gda__=1422060556_f5204cc0b2807c9b4fe12587090e8ec7', desc: 'Amit'},
        {src: 'https://scontent-a-lhr.xx.fbcdn.net/hphotos-frc3/v/t1.0-9/1013154_10201591238410907_1962861808_n.jpg?oh=fe64226c6e66b0696521fbc736bdd9ad&oe=54C92789', desc: 'Amit'},
        {src: 'https://scontent-a-lhr.xx.fbcdn.net/hphotos-xpa1/v/t1.0-9/9962_10201344270396861_1540282629_n.jpg?oh=156b78a1866c9fb6b9a396d276db98d3&oe=548B4C57', desc: 'Amit'}
    ];

    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
        return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
        $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
        $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
        $scope._Index = index;
    };

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


controllers.MainController = function ($scope, $timeout, Facebook) {
	// Define user empty data :/
	$scope.user = {};
	// Defining user logged status
	$scope.logged = false;
	// And some fancy flags to display messages upon user status change
	$scope.byebye = false;
	$scope.salutation = false;
	/**
	 * Watch for Facebook to be ready.
	 * There's also the event that could be used
	 */
	$scope.$watch(
		function () {
		return Facebook.isReady();
	},
		function (newVal) {
		if (newVal)
			$scope.facebookReady = true;
	});
	var userIsConnected = false;
	Facebook.getLoginStatus(function (response) {
		if (response.status == 'connected') {
			userIsConnected = true;
		}
	});
	/**
	 * IntentLogin
	 */
	$scope.IntentLogin = function () {
		if (!userIsConnected) {
			$scope.login();
		}
	};
	/**
	 * Login
	 */
	$scope.login = function () {
		Facebook.login(function (response) {
			if (response.status == 'connected') {
				$scope.logged = true;
				$scope.me();
			}

		});
	};
	/**
	 * me
	 */
	$scope.me = function () {
		Facebook.api('/me', function (response) {
			/**
			 * Using $scope.$apply since this happens outside angular framework.
			 */
			$scope.$apply(function () {
				$scope.user = response;
			});

		});
	};
	/**
	 * Logout
	 */
	$scope.logout = function () {
		Facebook.logout(function () {
			$scope.$apply(function () {
				$scope.user = {};
				$scope.logged = false;
			});
		});
	}
	/**
	 * Taking approach of Events :D
	 */
	$scope.$on('Facebook:statusChange', function (ev, data) {
		console.log('Status: ', data);
		if (data.status == 'connected') {
			$scope.$apply(function () {
				$scope.salutation = true;
				$scope.byebye = false;
			});
		} else {
			$scope.$apply(function () {
				$scope.salutation = false;
				$scope.byebye = true;

				// Dismiss byebye message after two seconds
				$timeout(function () {
					$scope.byebye = false;
				}, 2000)
			});
		}

	});
};

/**
* Just for debugging purposes.
* Shows objects in a pretty way
*/
webApp.directive('debug', function() {
	return {
		restrict:	'E',
		scope: {
			expression: '=val'
		},
		template:	'<pre>{{debug(expression)}}</pre>',
		link:	function(scope) {
			// pretty-prints
			scope.debug = function(exp) {
				return angular.toJson(exp, true);
			};
		}
	}
});

webApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

webApp.controller(controllers);
