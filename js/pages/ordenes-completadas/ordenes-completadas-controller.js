app.controller('OrdenesCompletadasController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval) {  

    $scope.loadOrdersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.ordenes_completadas_get_orders
        })
        .then(function(response) {
            $scope.gridOptions.data = response.data.get_ordersResult;
        });
    }
    $scope.loadOrdersData();

    $scope.gridOptions = { 
        enableRowSelection: false, 
        enableRowHeaderSelection: false, 
        multiSelect: false, 
        modifierKeysToMultiSelect: false
    };

});