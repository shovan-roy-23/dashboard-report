var app = angular.module('dashboard',['chart.js']).config(['ChartJsProvider', function (ChartJsProvider) {
	// Configure doughnut charts
	ChartJsProvider.setOptions('doughnut',{
		chartColors: ['#7f7f7f', '#2fbea2'],
		responsive: false,
		rotation: -0.8,
		tooltips: false
	});
	// Configure horizontal charts
	ChartJsProvider.setOptions('horizontalBar', {
		legend:{
			display: true,
			position: 'bottom',
			labels:{
				boxWidth: 5,
				fontSize: 10
			}
		},
		chartColors: ['#2fbea2', '#7f7f7f'],
		tooltips: false,
		scales: {
			xAxes: [{
				display: false,
				gridLines: {
					display:false,
				}
			}],
			yAxes: [{
				display: true,
				categoryPercentage: 0.77,
				barThickness: 15,
				gridLines: {
					display:false,
					lineWidth: 0,
					color: "rgba(255,255,255,0)"
				}				
			}]
		}		
	});
	
	ChartJsProvider.setOptions('bar', {
		chartColors: ['#2fbea2', '#2fbea2', '#2fbea2', '#2fbea2'],
		tooltips: false,
		scales: {
			xAxes:[{
				display: true,
				barPercentage: 0.1,
				categoryPercentage: 1,
				barThickness: 30,
				gridLines: {
					display:false,
					lineWidth: 0,
					color: "rgba(255,255,255,0)"
				}
			}],
            yAxes: [{
				display: false,
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 10
                },
				gridLines: {
					display:false,
					lineWidth: 0,
					color: "rgba(255,255,255,0)"
				}
            }]
        }
	});
	
	
}]);