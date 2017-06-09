app.controller('BloqueosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  

    $scope.action = 'block';

    $scope.setAction = function(value)
    {
        $scope.action = value;
    }



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
    ArtisterilIntervalService.start($scope.getBlockedProductsData);

});