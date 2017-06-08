var ArtisterilAuthService = angular.module('ArtisterilAuthService', [])
.service('ArtisterilAuthService', function ($rootScope, $location) 
{

    // load user from localStorage
    $rootScope.username = localStorage.username;
    if (localStorage.user_permissions) {
        $rootScope.user_permissions = $.parseJSON(localStorage.user_permissions);
    }
    else {
        $rootScope.user_permissions = [];
    }

    this.setUsername = function(username) 
    {
        $rootScope.username = localStorage.username = username;
    };

    this.setUserPermissions = function(user_permissions) 
    {
        localStorage.user_permissions = JSON.stringify(user_permissions);
        $rootScope.user_permissions = user_permissions;
    };

	this.userHasAccessToPage = function(page_slug) 
    {
        return $rootScope.user_permissions[page_slug] === true;
    };

    this.auth = function(page_slug) 
    {
        // user not logged in
        if (!$rootScope.username) {
            console.log("please log in");
            $location.url('/login');
        }
        // user do not have permission to access a page
        else if(!this.userHasAccessToPage(page_slug)) {
            console.log("you do not have access to this page");
            $location.url('/');
        }
    }

    this.logout = function()
    {
        $rootScope.username = localStorage.username = '';
    	$rootScope.user_permissions = [];
        localStorage.user_permissions = '';
		$location.url('/login');
    }

});