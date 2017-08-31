app.controller('LogsController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast, uiGridConstants, $interval) {  

    $scope.selectedIndex = 0;

    $scope.loadCamerasData = function()
    {
        if ($scope.selectedIndex == 0) {
            $http({
                method  : 'GET',
                url     : config.webservice.urls.logs_get_log_cameras
            })
            .then(function(response) {
                $scope.camerasData = response.data.get_log_camerasResult.join("\n");
            });
        }
    }
    ArtisterilIntervalService.start($scope.loadCamerasData, 2000);


    $scope.loadProductionData = function()
    {
        if ($scope.selectedIndex == 1) {
            $http({
                method  : 'GET',
                url     : config.webservice.urls.logs_get_log_production
            })
            .then(function(response) {
                $scope.productionData = response.data.get_log_productionResult.join("\n");
            });
        }
    }
    ArtisterilIntervalService.start($scope.loadProductionData, 2000);

});