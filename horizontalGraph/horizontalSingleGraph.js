(function(app, _CONF) {
    'use strict';

	app.directive('horizontalSingleChart',['dataService', function(dataService){
		return {
            restrict: 'A',
            scope: true,
            require: '?ngModel',
            templateUrl: 'horizontalGraph/horizontal-single-graph-tmpl.html',
            link: function(scope, elem, attr) {
            	var csatView = _CONF.csatView;
				dataService.fetch(csatView).then(function (result) {
					scope.csatViewReport = result;
				}, function(error) {

				});
            }
        };
	}]).directive('createHorizontalSingleGraph',function(){
		return {
			restrict:'A',
			replace:false,
			scope:{
				graphValue:'='
			},
			templateUrl:'horizontalGraph/horizontalSingle.html',
			link:function(scope,element,attrs){
				scope.getLabel = [];
				scope.getValue =[];
				angular.forEach(scope.graphValue.rowData, function(v,k){
					scope.getLabel.push(v.name);
					scope.getValue.push(v.value);
					
				});
				scope.labels = scope.getLabel;
				scope.data = [scope.getValue];
				
				scope.datasetOverride = [
					{
						fill: true,
						backgroundColor: [
							"#2fbea2","#2fbea2","#2fbea2","#2fbea2"
						]
					}
				];
				
				scope.horizontalSingleOptions ={
					legend:{
						display: false,
					},
					scales: {
						xAxes: [{
							display: false,
							gridLines: {
								display:false,
							},
							ticks: {
								max: 5,
								min: 0,
								stepSize: 1
							},
						}],
						yAxes: [{
							display: true,
							barPercentage: 0.1,
							categoryPercentage: 0.4,
							barThickness: 15,
							gridLines: {
								display:false,
								lineWidth: 0,
								color: "rgba(255,255,255,0)"
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
									ctx.fillStyle = '#fff';
									var y_pos = model.y + 7;
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
				
				/* scope.series =['Rev (Target)','Rev (FC)']; */
			}
		}
	});
}(app, _CONF))