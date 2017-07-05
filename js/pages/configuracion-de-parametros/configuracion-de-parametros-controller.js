app.controller('ConfiguracionDeParametrosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast) {  

    $scope.data = {};
    

    $scope.loadParametersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_parameters
        })
        .then(function(response) {
            $scope.parametersData = response.data.get_parametersResult;

            // split data into two columns
            var length = Object.keys(response.data.get_parametersResult).length,
                half = Math.ceil(length / 2);

            $scope.parametersDataLeft  = {};
            $scope.parametersDataRight = {};

            var i = 1;
            for (key in $scope.parametersData) {
                if (i <= half) {
                    $scope.parametersDataLeft[key] = $scope.parametersData[key];
                }
                else {
                    $scope.parametersDataRight[key] = $scope.parametersData[key];
                }
                i++;
            }
        });
    }
    $scope.loadParametersData();



    $scope.slugify = function(text)
    {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }


    $scope.saveParametersData = function()
    {
        $('body.page-configuracion-de-parametros .md-button.save').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.save_parameters
        })
        .then(function(response) {
            
            $rootScope.toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show($rootScope.toast);
            $('body.page-configuracion-de-parametros .md-button.save').attr("disabled", false).removeClass('loading');
        });
    }


});