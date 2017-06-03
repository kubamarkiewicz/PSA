
var app = angular.module("myApp", [
    "ngRoute",
    "ngMaterial"
]);

// load configuration from files
app.constant('config', window.config);

// ROUTING ===============================================
app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) { 

    $locationProvider.hashPrefix('');
    
    $routeProvider 

        .when('/', { 
            controller: 'HomeController', 
            templateUrl: 'js/pages/home/index.html' 
        })     
        .when('/contact', { 
            controller: 'ContactController', 
            templateUrl: 'js/pages/contact/index.html' 
        })   
        .otherwise({ 
            redirectTo: '/' 
        }); 


    // color theme
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('pink')
        .warnPalette('red');

});

// CORS fix
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.run(function($rootScope, $sce, $http, $location) {

});



    



