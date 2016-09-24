(function(app, _CONF) {
    'use strict';

	app.directive('currentQuarter',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'currentQuarter/currentQuarter.html',
            link: function(scope, elem, attr) {
            	var currentQuarterJSONURL = _CONF.currentQuarter;
				dataService.fetch(currentQuarterJSONURL).then(function (result) {
					scope.currentQuarter = result;
		        }, function(error) {

		        });
            }
        };
	}]);
}(app, _CONF))