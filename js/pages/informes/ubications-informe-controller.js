app.controller('UbicationsInformeController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, exportUiGridService, uiGridExporterConstants, uiGridExporterService) {  

    $scope.selectedIndex = 5;


    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Pasillo', type: 'numberStr',
                suppressRemoveSort: true,
                sort: {
                  direction: uiGridConstants.ASC,
                  priority: 0
                }
            }, 
            {field: 'Alveolo', type: 'numberStr',
                suppressRemoveSort: true,
                sort: {
                  direction: uiGridConstants.ASC,
                  priority: 1
                }
            }, 
            {field: 'Altura', type: 'numberStr',
                suppressRemoveSort: true,
                sort: {
                  direction: uiGridConstants.ASC,
                  priority: 2
                }
            }, 
            {field: 'Producto', type: 'numberStr'}, 
            {field: 'Piezas', type: 'numberStr'},
            {field: 'FechaDeAlmacenamiento', type: 'numberStr'},
        ],
        enableRowSelection: false, 
        enableRowHeaderSelection: false, 
        multiSelect: false, 
        modifierKeysToMultiSelect: false,  
        enableFiltering: true
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
	        url     : config.webservice.urls.informes_get_ubications
	    })
	    .then(function(response) {
	        $scope.gridOptions.data = response.data.get_ubicationsResult;
	    });
    }
    $scope.loadData();

   	
   	$scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };


});