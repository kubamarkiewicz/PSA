app.controller('StockPorReferenciaController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, exportUiGridService) {  

	$scope.selectedIndex = 1;

	$scope.ref = '';
	$scope.StockPiezas = '';
	$scope.StockPallets = '';
	$scope.MinPiezas = '';
	$scope.MaxPiezas = '';
	$scope.CMJ = '';

    $scope.loadData = function()
    {
	    $http({
	        method  : 'GET',
	        url     : config.webservice.urls.informes_get_stock_por_referencia,
            params  : {
                "Ref" : $scope.ref
            }
	    })
	    .then(function(response) {
	        $scope.StockPiezas = response.data.get_stock_por_referenciaResult.StockPiezas;
	        $scope.StockPallets = response.data.get_stock_por_referenciaResult.StockPallets;
	        $scope.MinPiezas = response.data.get_stock_por_referenciaResult.MinPiezas;
	        $scope.MaxPiezas = response.data.get_stock_por_referenciaResult.MaxPiezas;
	        $scope.CMJ = response.data.get_stock_por_referenciaResult.CMJ;
	        
	        $scope.gridOptions.data = response.data.get_stock_por_referenciaResult.Posiciones;
	    });
    }
    // $scope.loadData();


    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Pasillo', type: 'numberStr'},
            {field: 'Alveolo', type: 'numberStr'},
            {field: 'Altura', type: 'numberStr'}
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