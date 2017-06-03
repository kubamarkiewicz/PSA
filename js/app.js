
var app = angular.module("myApp", [
    "ngRoute"
]);

// load configuration from files
app.constant('config', window.config);

// ROUTING ===============================================
app.config(function ($routeProvider, $locationProvider) { 

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

});

// CORS fix
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.run(function($rootScope, $sce, $http, $location) {

});



    



