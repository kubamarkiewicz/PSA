app.controller('InformesController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  



    // get in actions

    $scope.actionsData = [];

    $scope.getActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.informes_get_actions
         })
        .then(function(response) {
            $scope.actionsData = response.data.get_actionsResult;
        });
    }
    $scope.getActionsData();


    // generate notification 

    $scope.generateInforme = function()
    {
        if (!$scope.notificationAction) {
            return;
        }

        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_generate_notification,
            params  : {
                "action" : $scope.notificationAction
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data.generate_notificationResult.Message);
            if (response.data.generate_notificationResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            // reset fields
            // $scope.actionsData = '';

            // reset form and disable error messages
            $scope.notificationForm.$setPristine();
            $scope.notificationForm.$setUntouched();
        });
    }



});