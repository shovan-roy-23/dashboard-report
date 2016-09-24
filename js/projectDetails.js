(function(app, _CONF) {
    'use strict';

	app.directive('positionOpenChart',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'projectDetails/project-open-position-tmpl.html',
            link: function(scope, elem, attr) {
            	var openPositionURL = _CONF.openPosition;
				dataService.fetch(openPositionURL).then(function (result) {
					scope.openPositionReport = result;
				}, function(error) {

				});
            }
        };
	}]);
}(app, _CONF))