app.controller('InformesController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  



    // get in actions

    $scope.actionsData = [];
    $scope.fields = [];

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


    // generate informe 

    $scope.generateInforme = function()
    {
        if (!$scope.action) {
            return;
        }

        var params = [];
        params['Action'] = $scope.action.Action;
        for (field in $scope.fields) {
            params[field] = $scope.fields[field];
        }

        $http({
            method  : 'GET',
            url     : config.webservice.urls.informes_generate_informe,
            params  : params
         })
        .then(function(response) {
            $rootScope.toast.content(response.data.generate_informeResult.Message);
            if (response.data.generate_informeResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            // reset fields
            $scope.ref = '';

            // reset form and disable error messages
            $scope.informeForm.$setPristine();
            $scope.informeForm.$setUntouched();
        });


        $scope.actionChanged = function()
        {
            $scope.fields = [];
        }
    }



});