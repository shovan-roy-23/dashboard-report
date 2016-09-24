(function(app, _CONF) {
    'use strict';

	app.directive('financialData',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'financialReport/financialReport.html',
            link: function(scope, elem, attr) {
            	var financialJSONURL = _CONF.financialYear;
				dataService.fetch(financialJSONURL).then(function (result) {
					scope.financialReport = result;
		        }, function(error) {

		        });
            }
        };
	}]);
}(app, _CONF))