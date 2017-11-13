app.controller('CamarasController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  

    $scope.camarasData = [];

    $scope.loadCamarasData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.camaras_get_camaras
        })
        .then(function(response) {
            $scope.camarasData = response.data.get_camarasResult;
        });
    }
    $scope.loadCamarasData();


});