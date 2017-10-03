app.controller('MaestroArticulosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval, exportUiGridService, uiGridExporterConstants, uiGridExporterService) {  

    $scope.gridOptions = { 
        columnDefs: [
            {field: 'Ref', type: 'numberStr', sort: { direction: 'asc', priority: 0 }},
            {field: 'Pasillo', type: 'numberStr'},
            {field: 'Alveolo', type: 'numberStr'},
            {field: 'PiezasPorPallet', type: 'numberStr'},
            {field: 'MinPiezas', type: 'numberStr'},
            {field: 'MaxPiezas', type: 'numberStr'},
            {field: 'MinPallets', type: 'numberStr'},
            {field: 'MaxPallets', type: 'numberStr'}
        ],
        enableRowSelection: true, 
        enableRowHeaderSelection: false, 
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
                $scope.articleForm.$setPristine();
                $scope.articleForm.$setUntouched();
            }
            else {
                $scope.selectedItem.New = false;
            }
        });
    };

    $scope.loadArticlesData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_get_articles
        })
        .then(function(response) {
            $scope.gridOptions.data = response.data.get_articlesResult;
        });
    }
    $scope.loadArticlesData();

    
    $scope.updateRow = function()
    {
        $('button.update').attr("disabled", true).addClass('loading');

        // delete $scope.selectedItem.$$hashKey;

        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_save_article,
            params  : {
                "Id"                : $scope.selectedItem.Id,
                "Ref"               : $scope.selectedItem.Ref,
                "Pasillo"           : $scope.selectedItem.Pasillo,
                "Alveolo"           : $scope.selectedItem.Alveolo,
                "PiezasPorPallet"   : $scope.selectedItem.PiezasPorPallet,
                "MinPiezas"         : $scope.selectedItem.MinPiezas,
                "MinPallets"        : $scope.selectedItem.MinPallets,
                "MaxPiezas"         : $scope.selectedItem.MaxPiezas,
                "MaxPallets"        : $scope.selectedItem.MaxPallets
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["save_articleResult"].Message);
            if (response.data["save_articleResult"].Result === true) {
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
            $scope.articleForm.$setPristine();
            $scope.articleForm.$setUntouched();
        });
    }

    
    $scope.deleteRow = function()
    {
        if (!confirm("Estas seguro que quieres suprimir este artucÍulo?")) {
            return;
        }

        $('button.delete').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_delete_article,
            params  : {
                "Id"    : $scope.selectedItem.Id
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["delete_articleResult"].Message);
            if (response.data["delete_articleResult"].Result === true) {
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
            $scope.articleForm.$setPristine();
            $scope.articleForm.$setUntouched();
        });
    }

    
    $scope.addRow = function()
    {
        $scope.selectedItem = {"Id":"0"};

        console.log(!$scope.selectedItem || ($scope.selectedItem.Id && $scope.selectedItem.Id == '0'));

        setTimeout(function(){ 
            $('input[name=ref]').focus();
        }, 30);
        
    }


    $scope.exportExcel = function() 
    {
        exportUiGridService.exportToExcel('sheet 1', $scope.gridApi, 'all', 'all');
    };

});