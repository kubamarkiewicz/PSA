app.controller('UbicationsController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval, exportUiGridService, uiGridExporterConstants, uiGridExporterService) {  

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
            {field: 'Piezas', type: 'numberStr'}
        ],
        enableRowSelection: true, 
        enableRowHeaderSelection: false, 
        multiSelect: false, 
        modifierKeysToMultiSelect: false,  
        enableFiltering: true
    };



    $scope.selectedItem = null;

    $scope.gridOptions.onRegisterApi = function(gridApi)
    {
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            $scope.selectedItem = row.isSelected ? row.entity : null;
            if (!row.isSelected) {
                // reset form and disable error messages
                $scope.ubicationForm.$setPristine();
                $scope.ubicationForm.$setUntouched();
            }
        });

        // Fix sort priority
        $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
            console.log(grid);
            console.log(sortColumns);
            for (i in sortColumns) {
                switch (sortColumns[i].field) {
                    case 'Pasillo':
                        sortColumns[i].sort.priority = 0;
                        break;
                    case 'Alveolo':
                        sortColumns[i].sort.priority = 1;
                        break;
                    case 'Altura':
                        sortColumns[i].sort.priority = 2;
                        break;
                }
            }
        });
    };

    $scope.loadArticlesData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.ubications_get_ubications
        })
        .then(function(response) {
            $scope.gridOptions.data = response.data.get_ubicationsResult;
        });
    }
    $scope.loadArticlesData();

    
    $scope.updateRow = function()
    {
        $('button.update').attr("disabled", true).addClass('loading');

        // delete $scope.selectedItem.$$hashKey;

        $http({
            method  : 'GET',
            url     : config.webservice.urls.ubications_save_ubication,
            params  : {
                "Id"                : $scope.selectedItem.Id,
                "Pasillo"           : $scope.selectedItem.Pasillo,
                "Alveolo"           : $scope.selectedItem.Alveolo,
                "Altura"            : $scope.selectedItem.Altura,
                "Producto"          : $scope.selectedItem.Producto,
                "Piezas"            : $scope.selectedItem.Piezas
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["save_ubicationResult"].Message);
            if (response.data["save_ubicationResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.update').attr("disabled", false).removeClass('loading');
            $scope.selectedItem = null;
            $scope.loadArticlesData();

            // reset form and disable error messages
            $scope.ubicationForm.$setPristine();
            $scope.ubicationForm.$setUntouched();
        });
    }

    
    $scope.deleteRow = function()
    {
        if (!confirm("Estas seguro que quieres suprimir esta ubicacion?")) {
            return;
        }

        $('button.delete').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.ubications_delete_ubication,
            params  : {                
                "Id"    : $scope.selectedItem.Id
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["delete_ubicationResult"].Message);
            if (response.data["delete_ubicationResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.delete').attr("disabled", false).removeClass('loading');
            $scope.selectedItem = null;
            $scope.loadArticlesData();

            // reset form and disable error messages
            $scope.ubicationForm.$setPristine();
            $scope.ubicationForm.$setUntouched();
        });
    }

    
    $scope.addRow = function()
    {
        $scope.selectedItem = {"Id":"0"};

        setTimeout(function(){ 
            $('input[name=Pasillo]').focus();
        }, 30);
        
    }

    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'visible', 'visible');
    };


});