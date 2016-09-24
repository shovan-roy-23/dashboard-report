(function (app) {
    'use strict';
    app.factory('dataService', function ($q, $http, $location) {
		function dataServicePromise(httpPromise) {
			var deferred = $q.defer();
			httpPromise.then(function successCallback(response) {
				deferred.resolve(response.data);
			}, function errorCallback(response) {
				if(response.status===401) {
					var url = $location.url();
				}
				if(response.status===0) {
					deferred.reject({"message": "Unable to contact the server. Please check your internet connection."});
				} else {
					deferred.reject(response.data);
				}

			});
			return deferred.promise;
		}

        var
			fetch = function (param) {
				var url = null;
				if (typeof param !== 'undefined') {
					url = param;
				}
				return dataServicePromise($http.get(url));
			};
			


		return {
			fetch: fetch
		};
	});
}(app));