app.controller('DatosDelSGAController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  


    // Popup Alerts

    $scope.popupAlertsData = {};
    $scope.popupAlertsCount = 0;

    $scope.getPopupAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.data_get_popup_alerts
         })
        .then(function(response) {
            $scope.popupAlertsData = {};
            $scope.popupAlertsCount = 0;
            for (i in response.data.get_popup_alertsResult) {
                $scope.popupAlertsData[response.data.get_popup_alertsResult[i].Title + response.data.get_popup_alertsResult[i].Message] = response.data.get_popup_alertsResult[i];
                $scope.popupAlertsCount += 1;
            }
        });
    }
    ArtisterilIntervalService.start($scope.getPopupAlertsData);
    // $scope.getPopupAlertsData();


    $("section.popup-alerts .open").click(function(){
        $("section.popup-alerts").removeClass('closed');
        ArtisterilIntervalService.start($scope.closePopupAlerts, 300000, 'closePopupAlerts', true);
    });
    $("section.popup-alerts .close").click(function(){
        $scope.closePopupAlerts();
    });

    $scope.closePopupAlerts = function() {
        $("section.popup-alerts").addClass('closed');
        ArtisterilIntervalService.stop('closePopupAlerts');
    }




    // Alerts

	$scope.alertsData = [];
    
    $scope.getAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_alerts
         })
        .then(function(response) {
            $scope.alertsData = response.data.get_alertsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getAlertsData);




    // Blocked products

    $scope.blockedProductsData = [];
    
    $scope.getBlockedProductsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_blocked_products
         })
        .then(function(response) {
            $scope.blockedProductsData = response.data.get_blocked_productsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getBlockedProductsData);

});