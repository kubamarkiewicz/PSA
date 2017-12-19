app.controller('MovimientosPorReferenciaController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 3;

    $scope.ref = '';
    $scope.fechaDesde = '';
    $scope.fechaHasta = '';
	$scope.data = '';


    $scope.loadData = function()
    {
	    $http({
	        method  : 'GET',
	        url     : config.webservice.urls.informes_get_movimientos_por_referencia,
            params  : {
                "Ref" : $scope.ref,
                "FechaDesde" : $rootScope.formatDateFromDatepickerForWebservice($scope.fechaDesde),
                "FechaHasta" : $rootScope.formatDateFromDatepickerForWebservice($scope.fechaHasta)
            }
	    })
	    .then(function(response) {
            $scope.data = response.data.get_movimientos_por_referenciaResult;
	    	$scope.gridOptions.data = $scope.data.Movimientos;
	    });
    }
    // $scope.loadData();


    $scope.gridOptions = { 
        columnDefs: [
            { field: 'Movimiento' },
            { field: 'Fecha', type: 'numberStr' }
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


    setTimeout(function(){ 
        $('form.myForm input:text').first().focus();
    }, 0);
    


    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };



});