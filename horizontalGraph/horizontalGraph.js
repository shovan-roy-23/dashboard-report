(function(app, _CONF) {
    'use strict';

	app.directive('horizontalChart',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'horizontalGraph/horizontal-graph-tmpl.html',
            link: function(scope, elem, attr) {
            	var towerCurrentView = _CONF.towerCurrentView;
				dataService.fetch(towerCurrentView).then(function (result) {
					scope.towerCurrentReport = result;
				}, function(error) {

				});
            }
        };
	}]).directive('createHorizontalGraph',function(){
		return {
			restrict:'A',
			replace:false,
			scope:{
				graphValue:'='
			},
			templateUrl:'horizontalGraph/horizontal.html',
			link:function(scope,element,attrs){
				scope.getLabel = [];
				scope.getLowerValue =[];
				scope.getUpperValue =[];
				angular.forEach(scope.graphValue.data, function(v,k){
					scope.getLabel.push(v.towerName);
					angular.forEach(v.towerValue, function(tv, tk){
						scope.getLowerValue.push(tv.RevTarget);
						scope.getUpperValue.push(tv.RevForecast);
					});
					
				});
				scope.labels = scope.getLabel;
				scope.data = [scope.getLowerValue, scope.getUpperValue];
				
				scope.datasetOverride = [
					{
						fill: true,
						backgroundColor: [
							"#2fbea2","#2fbea2","#2fbea2"
						]
					},
					{
						fill: true,
						backgroundColor: [
							"#7f7f7f","#7f7f7f","#7f7f7f"
						]
					}
				];
				
				scope.series =['Rev (Target)','Rev (FC)'];
				
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
									ctx.fillStyle = '#fff';
									var y_pos = model.y + 6;
									var x_pos = model.x - 20;
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