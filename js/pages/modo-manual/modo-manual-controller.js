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
            $scope.actionsData = response.data;
        });
    }
    $scope.getActionsData();


    // select action 

    $scope.selectAction = function()
    {
        $('p.action').addClass('loading');
        $scope.actionMessage = '';

        $http({
            method  : 'POST',
            url     : config.webservice.urls.select_action,
            data    : $.param({"action" : $scope.action}),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.actionMessage = response.data;
            $('p.action').removeClass('loading');
        });
    }



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
            $scope.readersData = response.data;
        });
    }
    ArtisterilIntervalService.start($scope.getReadersData);


    // select reader

    $scope.readerId = '';

    $scope.selectReader = function()
    {
        $('p.reader').addClass('loading');
        $scope.readerMessage = '';

        $http({
            method  : 'POST',
            url     : config.webservice.urls.select_reader_for_manual_mode,
            data    : $.param({"reader_id" : $scope.readerId}),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.readerMessage = response.data;
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
            method  : 'POST',
            url     : config.webservice.urls.execute_action,
            data    : $.param({"action" : $scope.action, "reader_id" : $scope.readerId, "product_id" : $scope.productId}),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
        .then(function(response) {
            // console.log(response.data);
            if (response.data === true) {
                toast.content('Éxito')
                    .toastClass('toast-success');
                $scope.productId = '';
                $scope.productIdMessage = '';
            }
            else {
                toast.content('Error')
                    .toastClass('toast-error');
            };
            $mdToast.show(toast);

            $('button.execute-acton').attr("disabled", false).removeClass('loading');

            // reset form and disable error messages
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        });
    }


});