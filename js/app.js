
var app = angular.module("myApp", [
    "ngRoute",
    "ngMaterial",
    'ArtisterilIntervalService',
    'ArtisterilAuthService'
]);

// load configuration from files
app.constant('config', window.config);

// ROUTING ===============================================
app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) { 

    $locationProvider.hashPrefix('');
    
    $routeProvider 

        .when('/', { 
            controller: 'DatosDelSGAController', 
            templateUrl: 'js/pages/datos-del-sga/index.html'
        })     
        .when('/login', { 
            controller: 'LoginController', 
            templateUrl: 'js/pages/login/index.html' 
        })     
        .when('/visualizador-del-proceso', { 
            controller: 'VisualizadorDelProcesoController', 
            templateUrl: 'js/pages/visualizador-del-proceso/index.html' 
        })      
        .when('/datos-del-sga', { 
            controller: 'DatosDelSGAController', 
            templateUrl: 'js/pages/datos-del-sga/index.html' 
        })    
        .when('/bloqueo-de-productos', { 
            controller: 'BloqueoDeProductosController', 
            templateUrl: 'js/pages/bloqueo-de-productos/index.html' 
        })    
        .when('/recepcion-de-productos', { 
            controller: 'RecepcionDeProductosController', 
            templateUrl: 'js/pages/recepcion-de-productos/index.html' 
        })    
        .when('/modo-manual', { 
            controller: 'ModoManualProductosController', 
            templateUrl: 'js/pages/modo-manual/index.html' 
        })   
        .otherwise({ 
            redirectTo: '/' 
        }); 


    // color theme
    $mdThemingProvider.definePalette('blue', {
        '50': 'E1EFF5',
        '100': 'B3D6E7',
        '200': '81BBD7',
        '300': '4E9FC7',
        '400': '288BBB',
        '500': '0276AF',
        '600': '026EA8',
        '700': '01639F',
        '800': '015996',
        '900': '014686',
        'A100': 'B3D5FF',
        'A200': '80B9FF',
        'A400': '4D9DFF',
        'A700': '338FFF',
        'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                            // on this palette should be dark or light

        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
         '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });   


    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('pink')
        .warnPalette('red');

    $mdThemingProvider.theme('dark', 'default')
        .primaryPalette('blue')
        .dark();

});

// CORS fix
app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

app.run(function($rootScope, $sce, $http, $location, $interval, ArtisterilAuthService, ArtisterilIntervalService) {

    $("body").removeClass('loading');

    $rootScope.$on('$routeChangeStart', function (event, next, prev) 
    {
        // get page slug
        $rootScope.pageSlug = 'datos-del-sga';
        if (next.originalPath && next.originalPath.substring(1)) {
            $rootScope.pageSlug = next.originalPath.substring(1);
        }

        // auth
        ArtisterilAuthService.auth($rootScope.pageSlug);

        // set body class "page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
        })
        .addClass("page-"+$rootScope.pageSlug);

        // select menu item
        var selectedItem = $('#menu-dropdown .md-button[href="#' + $rootScope.pageSlug + '"]');
        $('#menu-dropdown .md-button').not(selectedItem).removeClass('selected');
        selectedItem.addClass('selected');

        // page title
        $rootScope.pageTitle = selectedItem.text();
        
    });

    $rootScope.$on('$routeChangeSuccess', function() {

        // stop loading data
        ArtisterilIntervalService.stopAll();
        
    });


    $rootScope.logout = function() 
    {
        ArtisterilAuthService.logout();
    }


    // clock
    $interval(function(){
        var date = new Date();
        $rootScope.date = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + '/' +
                          (date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1)  + '/' +
                          date.getUTCFullYear() + ' ' +
                          date.toLocaleTimeString('en-US', { hour12: false, 
                                             hour: "numeric", 
                                             minute: "numeric", 
                                             second: "numeric"});
    }, 1000);


    // custom file input
    $('label.file-input input').change(function(){
        $(this).parent().find('span').text($(this).val().split(/[\\/]/).pop());
    });

});

    



