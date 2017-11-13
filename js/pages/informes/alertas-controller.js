app.controller('AlertasController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 6;


    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Tipo', type: 'numberStr', displayName: 'Tipo Alerta'},
            {field: 'Producto', type: 'numberStr'},
            {field: 'FechaAlerta', type: 'numberStr'},
            {field: 'FechaTratada', type: 'numberStr'}
        ],
        enableRowSelection: false, 
        enableRowHeaderSelection: false, 
        multiSelect: false, 
        modifierKeysToMultiSelect: false
    };

    $scope.gridOptions.onRegisterApi = function(gridApi)
    {
        //set gridApi on scope
        $scope.gridApi = gridApi;
    };


    $scope.loadData = function()
    {
	    $http({
	        method  : 'GET',
	        url     : config.webservice.urls.informes_get_alertas
	    })
	    .then(function(response) {
	        $scope.gridOptions.data = response.data.get_alertasResult;
	    });
    }
    $scope.loadData();


    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };



});