app.controller('MovimientosPorHoraController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 4;

    $scope.ref = '';
    $scope.cofor = '';
    $scope.fechaDesde = '';
    $scope.fechaHasta = '';

    $scope.loadData = function()
    {
	    $http({
	        method  : 'GET',
	        url     : config.webservice.urls.informes_get_movimientos_por_hora,
            params  : {
                "Ref" : $scope.ref,
                "Cofor" : $scope.cofor,
                "FechaDesde" : $rootScope.formatDateFromDatepickerForWebservice($scope.fechaDesde),
                "FechaHasta" : $rootScope.formatDateFromDatepickerForWebservice($scope.fechaHasta)
            }
	    })
	    .then(function(response) {
	    	$scope.gridOptions.data = response.data.get_movimientos_por_horaResult;
	    });
    }
    // $scope.loadData();


    $scope.gridOptions = { 
        columnDefs: [
            { field: 'Ref', type: 'numberStr', displayName: 'Referencia' },
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