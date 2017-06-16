app.controller('BloqueoDeProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  

    $scope.action = '';

    $scope.setAction = function(value)
    {
        $scope.action = value;
    }

    
    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));




    // get Blocked products

    $scope.blockedProductsData = [];
    
    $scope.getBlockedProductsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_blocked_products
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.blockedProductsData = response.data.get_blocked_productsResult;
        });
    }
    $scope.getBlockedProductsData();



    // block product

    $scope.productId = '';

    $scope.blockProductByInput = function()
    {
        $('button.block-product').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : $scope.action == 'block' ? config.webservice.urls.block_products : config.webservice.urls.unblock_products,
            params  : {"productlist" : JSON.stringify([$scope.productId])}
         })
        .then(function(response) {
            // console.log(response.data);
            toast.content('Éxito')
                .toastClass('toast-success');
            $scope.productId = '';
            $('input[name=productId]').focus();
            $scope.getBlockedProductsData();
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
            $scope.readersData = response.data.get_readersResult;
        });
    }
    $scope.getReadersData();


    // select reader

    $scope.readerId = '';

    $scope.selectReader = function()
    {
        $('form.reader button').attr("disabled", true).addClass('loading');

        return $http({
            method  : 'GET',
            url     : $scope.action == 'block' ? config.webservice.urls.select_reader_for_blocking : config.webservice.urls.select_reader_for_unblocking,
            params  : {"id" : $scope.readerId}
         })
        .then(function(response) {
            // console.log(response.data);
            toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show(toast);
            $('form.reader button').attr("disabled", false).removeClass('loading');
        });
    }




    // upload file

    $scope.uploadFile = function()
    {
        $('form.upload-file button').attr("disabled", true).addClass('loading');

        // read file as text
        var reader = new FileReader();
        reader.onload = function(){
            $scope.blockProductsFromFile(reader.result);
        };
        reader.readAsText(document.getElementById('uploadFileInput').files[0]);
    }

    $scope.blockProductsFromFile = function(fileContent)
    {
        $http({
            method  : 'GET',
            url     : $scope.action == 'block' ? config.webservice.urls.block_products_from_file : config.webservice.urls.unblock_products_from_file,
            params  : {'productlist' : fileContent}
        })
        .then(function(response) {
            // console.log(response.data);
            toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show(toast);
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }




    // unblock product

    $scope.unblockProductById = function(productId)
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.unblock_products,
            params  : {"productlist" : [productId]}
         })
        .then(function(response) {
            // console.log(response.data);
            toast.content('Éxito')
                .toastClass('toast-success');
            $scope.getBlockedProductsData();
            $mdToast.show(toast);
        });
    }
});