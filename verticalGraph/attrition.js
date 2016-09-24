(function(app, _CONF) {
    'use strict';

	app.directive('verticalGraphChart',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'verticalGraph/vertical-graph-tmpl.html',
            link: function(scope, elem, attr) {
            	var attritionView = _CONF.attritionView;
				dataService.fetch(attritionView).then(function (result) {
					scope.attritionViewReport = result;
				}, function(error) {

				});
            }
        };
	}]).directive('createAttritionGraph',function(){
		return {
			restrict:'A',
			replace:false,
			scope:{
				graphValue:'='
			},
			templateUrl:'verticalGraph/verticalGraph.html',
			link:function(scope,element,attrs){
				scope.getLabel = [];
				scope.getLabelValues =[];
				angular.forEach(scope.graphValue.rowData, function(v,k){
					scope.getLabel.push(v.name);
					scope.getLabelValues.push(v.value);
				});
				scope.labels = scope.getLabel;
				scope.data = [scope.getLabelValues];
				
				scope.datasetOverride = [
					{
						fill: true,
						backgroundColor: [
							"#2fbea2","#2fbea2","#2fbea2","#2fbea2"
						]
					}
				];
				
				scope.animationData={
					animation:{
						onComplete: function(){
							var ctx = this.chart.ctx;
							ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'bold', Chart.defaults.global.defaultFontFamily);
							ctx.textAlign = 'center';
							ctx.textBaseline = 'bottom';

							this.data.datasets.forEach(function (dataset) {
								for (var i = 0; i < dataset.data.length; i++) {
									var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
										scale_max = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
									ctx.fillStyle = '#000';
									var y_pos = model.y - 6;
									var x_pos = model.x;
									/* // Make sure data value does not get overflown and hidden
									// when the bar's value is too close to max value of scale
									// Note: The y value is reverse, it counts from top down */
									if ((scale_max - model.y) / scale_max >= 0.93)
										y_pos = model.y + 20; 
									ctx.fillText(dataset.data[i], x_pos, y_pos);
								}
							}); 
						}
					}
				};
			}
		}
	});
}(app, _CONF))