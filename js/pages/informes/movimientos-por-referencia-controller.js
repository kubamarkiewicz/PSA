app.controller('MovimientosPorReferenciaController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 3;

    $scope.ref = '';
    $scope.fecha = '';
	$scope.data = '';

    $scope.loadData = function()
    {
        console.log($scope.fecha);

        var date = '';
        if ($scope.fecha) {
            var day = ("0" + $scope.fecha.getDate()).slice(-2);
            var monthIndex = ("0" + ($scope.fecha.getMonth() + 1)).slice(-2);
            var year = $scope.fecha.getFullYear();
            date = day + '/' + monthIndex + '/' + year;
        }

	    $http({
	        method  : 'GET',
	        url     : config.webservice.urls.informes_get_movimientos_por_referencia,
            params  : {
                "Ref" : $scope.ref,
                "Fecha" : date
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
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'all', 'all');
    };


});