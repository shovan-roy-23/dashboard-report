(function(app, _CONF) {
    'use strict';

	app.directive('projectGraphChart',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'verticalGraph/project-graph-tmpl.html',
            link: function(scope, elem, attr) {
            	var redProjectView = _CONF.redProjectView;
				dataService.fetch(redProjectView).then(function (result) {
					scope.redProjectViewReport = result;
				}, function(error) {

				});
            }
        };
	}]).directive('createProjectGraph',function(){
		return {
			restrict:'A',
			replace:false,
			scope:{
				graphValue:'='
			},
			templateUrl:'verticalGraph/projectGraph.html',
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
				
				scope.projectOptions = {
					scales: {
						xAxes: [{
							display: true,
							gridLines: {
								display:false,
								lineWidth: 0,
								color: "rgba(255,255,255,0)"
							},
							barPercentage: 0.1,
							categoryPercentage: 0.6,
							barThickness: 15
						}],
						yAxes: [{
							display: false,
							barPercentage: 0.1,
							categoryPercentage: 0.4,
							barThickness: 10,
							gridLines: {
								display:false,
								lineWidth: 0,
								color: "rgba(255,255,255,0)"
							},
							ticks: {
								max: 3,
								min: 0,
								stepSize: 0.4
							}
							
						}]
					},
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