app.controller('RecepcionDeProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  
    
    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));



    // insert product

    $scope.productId = '';

    $scope.insertProductByInput = function()
    {
        $('button.block-product').attr("disabled", true).addClass('loading');

        $http({
            method  : 'POST',
            url     : config.webservice.urls.insert_products,
            data    : $.param({"products" : JSON.stringify([$scope.productId])}),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
        .then(function(response) {
            // console.log(response.data);
            if (response.data === true) {
                toast.content('Éxito')
                    .toastClass('toast-success');
                $scope.productId = '';
                $('input[name=productId]').focus();
            }
            else {
                toast.content('Error')
                    .toastClass('toast-error');
            };
            $mdToast.show(toast);
            $('button.block-product').attr("disabled", false).removeClass('loading');
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
        $('form.reader button').attr("disabled", true).addClass('loading');

        return $http({
            method  : 'POST',
            url     : $scope.action == 'block' ? config.webservice.urls.select_reader_for_blocking : config.webservice.urls.select_reader_for_unblocking,
            data    : $.param({"reader_id" : $scope.readerId}),
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
         })
        .then(function(response) {
            // console.log(response.data);
            if (response.data === true) {
                toast.content('Éxito')
                    .toastClass('toast-success');
            }
            else {
                toast.content('Error')
                    .toastClass('toast-error');
            };
            $mdToast.show(toast);
            $('form.reader button').attr("disabled", false).removeClass('loading');
        });
    }


    // upload file

    $scope.uploadFile = function()
    {
        $('form.upload-file button').attr("disabled", true).addClass('loading');

        var formData = new FormData();
        formData.append('file', document.getElementById('uploadFileInput').files[0]);

        $http({
            method  : 'POST',
            url     : config.webservice.urls.insert_products_from_file,
            data    : formData,
            transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
        })
        .then(function(response) {
            // console.log(response.data);
            if (response.data === true) {
                toast.content('Éxito')
                    .toastClass('toast-success');
                $scope.myFile = '';
            }
            else {
                toast.content('Error')
                    .toastClass('toast-error');
            };
            $mdToast.show(toast);
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
        });
    }


});