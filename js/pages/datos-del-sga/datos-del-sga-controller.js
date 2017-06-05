app.controller('DatosDelSGAController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  
	
    // Alerts

	$scope.alertsData = [];
    
    $scope.getAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_alerts
         })
        .then(function(response) {
        	// console.log(response.data);
            $scope.alertsData = response.data;
        });
    }
    $scope.getAlertsData();
    ArtisterilIntervalService.setInterval($scope.getAlertsData);




    // Blocked products

    $scope.blockedProductsData = [];
    
    $scope.getBlockedProductsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_blocked_products
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.blockedProductsData = response.data;
        });
    }
    $scope.getBlockedProductsData();
    ArtisterilIntervalService.setInterval($scope.getBlockedProductsData, null, false);

});