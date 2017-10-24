app.controller('BloqueoDeProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  


    $scope.action = '';


    $scope.setAction = function(value)
    {
        $scope.action = value;

        // reset reader
        $scope.readerId = null;
        // ArtisterilIntervalService.stopAll();
    }


    // get Blocked products

    $scope.blockedProductsData = [];
    
    $scope.getBlockedProductsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.blockings_get_blocked_products
         })
        .then(function(response) {
            $scope.blockedProductsData = response.data.get_blocked_productsResult;
        });
    }
    $scope.getBlockedProductsData();



    // block product

    $scope.selectedProducts = [];

    $scope.addProductToSelection = function()
    {
        $scope.passage = $scope.passage.toString();
        $scope.position = $scope.position.toString();
        $scope.height = $scope.height.toString();
        if ($scope.passage.length == 1) $scope.passage = "0" + $scope.passage;
        if ($scope.position.length == 1) $scope.position = "0" + $scope.position;
        $scope.selectedProducts.push("R." + $scope.passage + $scope.position + "." + $scope.height);
        console.log($scope.selectedProducts);
        $scope.passage = $scope.position = $scope.height = '';
        $('input[name=passage]').focus();
    
        // reset form and disable error messages
        $scope.productForm.$setPristine();
        $scope.productForm.$setUntouched();
    }

    $scope.selectProduct = function(productId)
    {
        if (!productId) {
            return;
        }

        $scope.selectedProducts.push(productId);
    }


    $scope.blockProducts = function()
    {
        if (!$scope.selectedProducts) {
            return;
        }

        $('button.block-products').attr("disabled", true).addClass('loading');

        $http({
            method  : 'GET',
            url     : $scope.action == 'block' ? config.webservice.urls.block_products : config.webservice.urls.unblock_products,
            params  : {
                "productlist" : JSON.stringify($scope.selectedProducts)
            }
         })
        .then(function(response) {
            $rootScope.toast.content(response.data[$scope.action + "_productsResult"].Message);
            if (response.data[$scope.action + "_productsResult"].Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            $('button.block-products').attr("disabled", false).removeClass('loading');
            $scope.selectedProducts = [];
            $scope.getBlockedProductsData();
        });
    }



    $scope.removeFromSelection = function(item) 
    {
        var index = $scope.selectedProducts.indexOf(item);
        if (index > -1) {
            $scope.selectedProducts.splice(index, 1);
        }
    }

    
    $scope.formatID = function(item)
    {
        return item.substring(2, 4) + ' ' + item.substring(4, 6) + ' ' + item.substring(7, 8);
    }


    $("input[name=passage]").change(function(){
        var positionInput = $("input[name=position]");
        if (($(this).val() >= 9) && ($(this).val() <= 16)) {
            positionInput.attr('max', '22');
        }
        else {
            positionInput.attr('max', '18');
        }
        positionInput.val('');
    });



});