app.controller('StockPorProveedorController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 2;

	$scope.cofor = '';


    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Ref', type: 'numberStr', displayName: 'Referencia'},
            {field: 'StockPiezas', type: 'numberStr'},
            {field: 'StockPallets', type: 'numberStr'},
            {field: 'MaxPiezas', type: 'numberStr'},
            {field: 'MinPiezas', type: 'numberStr'},
            {field: 'CMJ', type: 'numberStr', displayName: 'CMJ'}
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
	        url     : config.webservice.urls.informes_get_stock_por_proveedor,
            params  : {
                "Cofor" : $scope.cofor
            }
	    })
	    .then(function(response) {
	        $scope.gridOptions.data = response.data.get_stock_por_proveedorResult;
	    });
    }
    // $scope.loadData();

    setTimeout(function(){ 
        $('form.myForm input:text').first().focus();
    }, 0);
    


    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };


});