(function(app, _CONF) {
    'use strict';

	app.directive('redProjectData',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'projectDetails/red-project-details-tmpl.html',
            link: function(scope, elem, attr) {
            	var redProjectDetailsURL = _CONF.redProjectDetails;
				dataService.fetch(redProjectDetailsURL).then(function (result) {
					scope.redProjectDetailsReport = result;
				}, function(error) {

				});
            }
        };
	}]);
}(app, _CONF))