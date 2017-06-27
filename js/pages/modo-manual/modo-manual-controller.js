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
            url     : config.webservice.urls.get_readers_for_manual_mode
         })
        .then(function(response) {
            // console.log(response.data);
            $scope.readersData = response.data.get_readersResult;
        });
    }
    // $scope.getReadersData();
    ArtisterilIntervalService.start($scope.getReadersData, 5000);


    // select reader

    $scope.readerId = '';

    $scope.selectReader = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.select_reader_for_manual_mode,
            params  : {"id" : $scope.readerId}
         })
        .then(function(response) {
            // console.log(response.data);
            toast.content('Éxito')
                .toastClass('toast-success');
            $mdToast.show(toast);
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
            toast.content(response.data.select_actionResult.Message);
            if (response.data.select_actionResult.Result === true) {
                toast.toastClass('toast-success');
            }
            else {
                toast.toastClass('toast-error');
            }
            $mdToast.show(toast);

            $('button.execute-acton').attr("disabled", false).removeClass('loading');

            // reset form and disable error messages
            $scope.myForm.$setPristine();
            $scope.myForm.$setUntouched();
        });
    }




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
            params  : {'actionlist' : fileContent}
        })
        .then(function(response) {
            // console.log(response.data);
            toast.content(response.data.upload_actions_fileResult.Message);
            if (response.data.upload_actions_fileResult.Result === true) {
                toast.toastClass('toast-success');
            }
            else {
                toast.toastClass('toast-error');
            }
            $mdToast.show(toast);
            
            $('form.upload-file button').attr("disabled", false).removeClass('loading');
            $('#uploadFileInput').val('');
        });
    }


});