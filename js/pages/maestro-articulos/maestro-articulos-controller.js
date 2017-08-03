app.controller('MaestroArticulosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  


    $scope.articlesData = {};
    
    $scope.loadArticlesData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.maestro_articles_get_articles
        })
        .then(function(response) {
            $scope.parametersData = response.data.get_articlesResult;
        });
    }
    $scope.loadArticlesData();

});