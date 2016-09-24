(function(app, _CONF) {
    'use strict';

	app.directive('circleChart',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'circleGraph/circle-graph-tmpl.html',
            link: function(scope, elem, attr) {
            	var circleGraph = _CONF.circleGraph;
				dataService.fetch(circleGraph).then(function (result) {
					scope.circleGraph = result;
				}, function(error) {

				});
            }
        };
	}]).directive('createCircleGraph',function(){
		return {
			restrict:'A',
			replace:false,
			scope:{
				graphValue:'='
			},
			templateUrl:'circleGraph/circle.html',
			link:function(scope,element,attrs){
				scope.dataInfo = scope.graphValue.value;
				scope.labels = [""];
				scope.data = [100, parseInt(scope.graphValue.value)];
				
				scope.doughnutDataset ={
					hoverBackgroundColor: ['#7f7f7f', '#2fbea2']
				};
			}
		}
	});
}(app, _CONF))