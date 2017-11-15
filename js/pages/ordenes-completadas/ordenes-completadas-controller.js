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
        columnDefs: [
            {field: 'Id', type: 'numberStr'}, 
            {field: 'Asignado', type: 'numberStr'}, 
            {field: 'Dispositivo', type: 'numberStr'}, 
            {field: 'Producto', type: 'numberStr'}, 
            {field: 'Origen', type: 'numberStr'}, 
            {field: 'Destino', type: 'numberStr'}, 
            {field: 'Estado', type: 'numberStr'}, 
            {field: 'EnviadoTram', type: 'numberStr'}, 
            {field: 'Fecha', type: 'numberStr'}, 
            {field: 'Hora', type: 'numberStr'}
        ],
        enableRowSelection: false, 
        enableRowHeaderSelection: false, 
        multiSelect: false, 
        modifierKeysToMultiSelect: false
    };

});