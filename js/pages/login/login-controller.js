app.controller('LoginController', function($scope, $rootScope, $http, $routeParams, config, $mdToast, $location, ArtisterilAuthService) { 

	$scope.loading = false;

    // page title
    $rootScope.pageTitle = 'Login';


    // SUBMIT FORM
    $scope.submit = function () 
    {

        $http({
            method  : 'GET',
            url     : config.webservice.urls.user_login,
            params 	: {'username' : $scope.username, 'password' : $scope.password}
        })
        .then(function(response) {
            // console.log(response.data);
            // console.log(response.data === true);
            if (response.data === true) {

                ArtisterilAuthService.setUsername($scope.username);
            	
                // get user permissions
                $http({
                    method  : 'GET',
                    url     : config.webservice.urls.user_has_access,
                    data    : {'username': $scope.username}
                })
                .then(function(response) {
                    // set permissions
                    ArtisterilAuthService.setUserPermissions(response.data);

                    // redirect
                    $location.url('/');
                });
            }
            else { // incorrect password
        		$scope.loading = false;
        		
				var toast = $mdToast.simple()
				    .content('Usuario o contraseña no correcta')
				    .hideDelay(3000)
				    .position('top left')
				    .parent($('body > main'))
				    .toastClass('toast-error');
				$mdToast.show(toast);
            }
        });
         
        $scope.loading = true;
    }

});