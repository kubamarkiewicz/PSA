app.controller('MovimientosPorHoraController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 4;

    $scope.ref = '';
    $scope.cofor = '';
	$scope.fecha = '';

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
	        url     : config.webservice.urls.informes_get_movimientos_por_hora,
            params  : {
                "Ref" : $scope.ref,
                "Cofor" : $scope.cofor,
                "Fecha" : date
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
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'all', 'all');
    };


});