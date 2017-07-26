app.controller('ModoManualProductosController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $mdToast) {  

    $scope.product_code_length = config.config.product_code_length;
   

    // get actions

    $scope.actionsData = [];

    $scope.getActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_actions
         })
        .then(function(response) {
            $scope.actionsData = response.data.get_actionsResult;
        });
    }
    $scope.getActionsData();



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
            params  : {
                "action"    : $scope.action, 
                "product"   : $scope.productId,
                "location"  : $scope.location
            },
         })
        .then(function(response) {
            $rootScope.toast.content(response.data.add_warehouseOrderResult.Message);
            if (response.data.add_warehouseOrderResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);

            $('button.execute-acton').attr("disabled", false).removeClass('loading');

            // reset fields
            $scope.action = null;
            $scope.productId = '';
            $scope.location = '';
            $scope.actionForm.$setPristine();
            $scope.actionForm.$setUntouched();
        });
    }


    $scope.clearReading = function() 
    {
        $scope.productId = '';
    }




    // get file actions

    $scope.fileActionsData = [];

    $scope.getFileActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_get_file_actions
         })
        .then(function(response) {
            $scope.fileActionsData = response.data.get_file_actionsResult;
        });
    }
    $scope.getFileActionsData();

    // upload file

    $scope.uploadFile = function()
    {
        $('form.upload-file button').attr("disabled", true).addClass('loading');

        // read file as text
        var reader = new FileReader();
        reader.onload = function(){
            $scope.uploadActionsFile(reader.result);
        };
        reader.readAsText(document.getElementById('uploadFileInput').files[0]);
    }

    $scope.uploadActionsFile = function(fileContent)
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.upload_actions_file,
            params  : {
                "action" : $scope.fileAction,
                'actionlist' : fileContent
            }
        })
        .then(function(response) {
            $rootScope.toast.content(response.data.upload_warehouseOrders_fileResult.Message);
            if (response.data.upload_warehouseOrders_fileResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }


    $("button.clear").click(function(){
        $(this).parent().find('input').val('');
    });




    // get PDF actions

    $scope.pdfActionsData = [];

    $scope.getPdfActionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_get_pdf_actions
         })
        .then(function(response) {
            $scope.pdfActionsData = response.data.get_pdf_actionsResult;
        });
    }
    $scope.getPdfActionsData();


    // generate PDF 

    $scope.generatePDF = function()
    {
        if (!$scope.pdfAction) {
            return;
        }

        $http({
            method  : 'GET',
            url     : config.webservice.urls.manual_generate_pdf,
            params  : {"action" : $scope.pdfAction}
         })
        .then(function(response) {
            $rootScope.toast.content(response.data.generate_pdfResult.Message);
            if (response.data.generate_pdfResult.Result === true) {
                $rootScope.toast.toastClass('toast-success');
            }
            else {
                $rootScope.toast.toastClass('toast-error');
            }
            $mdToast.show($rootScope.toast);
            
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }


});