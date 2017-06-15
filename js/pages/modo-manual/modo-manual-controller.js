app.controller('ModoManualProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  
    
    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));


    // get actions

    $scope.actionsData = [];

    $scope.getActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_actions
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.actionsData = response.data.get_actionsResult;
        });
    }
    $scope.getActionsData();



    // get readers

    $scope.readersData = [];

    $scope.getReadersData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_readers
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.readersData = response.data.get_readersResult;
        });
    }
    $scope.getReadersData();


    // select reader

    $scope.readerId = '';

    $scope.selectReader = function()
    {
        $('p.reader').addClass('loading');
        $scope.readerMessage = '';

        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_reader_for_manual_mode,
            params  : {"reader_id" : $scope.readerId}
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.readerMessage = response.data.Message;
            $('p.reader').removeClass('loading');
            // receive reading from reader
            $scope.getReaderReading($scope.readerId);
        });
        
    }

    $scope.getReaderReading = function(readerId)
    {
        $('p.product-id').addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_reader_reading,
            params  : {"reader_id" : readerId}
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.productId = response.data.value;
            $scope.productIdMessage = response.data.message;

            $('p.product-id').removeClass('loading');
        }, function(){
            $('p.product-id').removeClass('loading');
        });
    }
    


    // execute action 

    $scope.executeAction = function()
    {
        if (!$scope.action) {
            return;
        }

        $('button.execute-acton').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_action,
            params  : {"action" : $scope.action, "reader" : $scope.readerId, "product" : $scope.productId},
         })
        .then(function(response) {
            // console.log(response.data);
            toast.content('Éxito')
                .toastClass('toast-success');
            $scope.productId = '';
            $mdToast.show(toast);

            $('button.execute-acton').attr("disabled", false).removeClass('loading');

            // reset form and disable error messages
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        });
    }


});