app.controller('ConfiguracionDeParametrosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast) {  

    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));


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


});