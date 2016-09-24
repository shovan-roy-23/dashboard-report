(function (app, _CONF) {
    'use strict';
	app.controller('appController',['$scope', 'dataService', function($scope, dataService) {
		
	}]);
	
	app.controller('titleBarController',function($scope){
		$scope.currentDate = new Date();
	});
	
}(app, _CONF));