app.controller('OcupacionDeEstanteriasController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 0;


    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Pasillo', type: 'numberStr'},
            {field: 'Ocupacion', type: 'numberStr'},
            {field: 'HuecosOcupados', type: 'numberStr'},
            {field: 'HuecosLibres', type: 'numberStr'}
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
	        url     : config.webservice.urls.informes_get_ocupacion_de_estanterias
	    })
	    .then(function(response) {
	        $scope.gridOptions.data = response.data.get_ocupacion_de_estanteriasResult;
	    });
    }
    $scope.loadData();


    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };


});