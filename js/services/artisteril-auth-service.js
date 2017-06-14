var ArtisterilAuthService = angular.module('ArtisterilAuthService', [])
.service('ArtisterilAuthService', function ($rootScope, $location, $http) 
{

    // load user from localStorage
    $rootScope.username = localStorage.username;
    $rootScope.user_permissions = [];

    this.setUsername = function(username) 
    {
        $rootScope.username = localStorage.username = username;
    };

    this.loadUserPermissions = function(username) 
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.user_has_access,
            data    : {'username': username}
        })
        .then(function(response) {
            // set permissions
            $rootScope.user_permissions = response.data;
        });
    };

    this.auth = function(page_slug) 
    {
        // user not logged in
        if (!$rootScope.username) {
            console.log("please log in");
            $location.url('/login');
        }
    }

    this.logout = function()
    {
        $rootScope.username = localStorage.username = '';
    	$rootScope.user_permissions = [];
		$location.url('/login');
    }
    
    // load user permisions
    if ($rootScope.username) {
        this.loadUserPermissions($rootScope.username);
    }

});