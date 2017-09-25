app.controller('UbicationsController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval) {  

    $scope.gridOptions = { 
        enableRowSelection: true, 
        enableRowHeaderSelection: false, 
        multiSelect: false, 
        modifierKeysToMultiSelect: false
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
                "Producto"          : $scope.selectedItem.Producto
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
            $('input[name=ref]').focus();
        }, 30);
        
    }




});