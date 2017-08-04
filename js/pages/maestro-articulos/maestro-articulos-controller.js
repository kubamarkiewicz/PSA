app.controller('MaestroArticulosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval) {  

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
                $scope.articleForm.$setPristine();
                $scope.articleForm.$setUntouched();
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
                "article" : JSON.stringify($scope.selectedItem)
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
                "ref" : $scope.selectedItem.Ref
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
        $scope.selectedItem = {};

        setTimeout(function(){ 
            $('input[name=ref]').focus();
        }, 30);
        
    }




});