app.controller('OrdenesEnCursoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval) {  

    $scope.loadOrdersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.ordenes_en_curso_get_orders
        })
        .then(function(response) {
            $scope.gridOptions.data = response.data.get_ordersResult;
        });
    }
    $scope.loadOrdersData();

    $scope.gridOptions = {         
        columnDefs: [
            {field: 'Id', type: 'numberStr'}, 
            {field: 'Asignado', type: 'numberStr'}, 
            {field: 'Dispositivo', type: 'numberStr'}, 
            {field: 'Producto', type: 'numberStr'}, 
            {field: 'Origen', type: 'numberStr'}, 
            {field: 'Destino', type: 'numberStr'}, 
            {field: 'Estado', type: 'numberStr'}, 
            {field: 'EnviadoTram', type: 'numberStr'}, 
            {field: 'Fecha', type: 'numberStr'}, 
            {field: 'Hora', type: 'numberStr'}
        ],
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
        });
    };


    $scope.deleteRow = function()
    {
        if (!$scope.selectedItem) {
            return;
        }
        if ($scope.selectedItem.Estado != "PENDIENTE") {
            alert("Solo se pueder borrar las órdenes en estado PENDIENTE");
            return;
        }
        if ($scope.selectedItem.AsignadoA) {
            alert("No se pueder borrar las órdenes asignadas");
            return;
        }

        if (!confirm("Estas seguro que quieres borrar esta órden?")) {
            return;
        }

        $('button.delete').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.ordenes_en_curso_delete_order,
            params  : {
                "Id" : $scope.selectedItem.Id
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data["delete_orderResult"].Message);
            if (response.data["delete_orderResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.delete').attr("disabled", false).removeClass('loading');
            $scope.selectedItem = null;
            $scope.loadOrdersData();
        });
    }


});