
var app = angular.module("myApp", [
    "ngRoute",
    "ngMaterial",
    'ArtisterilIntervalService',
    'ArtisterilAuthService',
    'ui.grid',
    'ui.grid.selection'
]);

// load configuration from files
app.constant('config', window.config);

// ROUTING ===============================================
app.config(function ($routeProvider, $locationProvider, $mdThemingProvider) { 

    $locationProvider.hashPrefix('');
    
    $routeProvider 

        .when('/login', { 
            controller: 'LoginController', 
            templateUrl: 'js/pages/login/index.html' 
        })     
        .when('/visualizador-del-proceso', { 
            controller: 'VisualizadorDelProcesoController', 
            templateUrl: 'js/pages/visualizador-del-proceso/index.html' 
        })      
        .when('/bloqueo-de-productos', { 
            controller: 'BloqueoDeProductosController', 
            templateUrl: 'js/pages/bloqueo-de-productos/index.html' 
        })  
        .when('/configuracion-de-parametros', { 
            controller: 'ConfiguracionDeParametrosController', 
            templateUrl: 'js/pages/configuracion-de-parametros/index.html' 
        })  
        .when('/informes', { 
            controller: 'InformesController', 
            templateUrl: 'js/pages/informes/index.html' 
        })   
        .when('/maestro-articulos', { 
            controller: 'MaestroArticulosController', 
            templateUrl: 'js/pages/maestro-articulos/index.html' 
        })   
        .when('/ordenes-en-curso', { 
            controller: 'OrdenesEnCursoController', 
            templateUrl: 'js/pages/ordenes-en-curso/index.html' 
        })   
        .when('/ordenes-completadas', { 
            controller: 'OrdenesCompletadasController', 
            templateUrl: 'js/pages/ordenes-completadas/index.html' 
        })   
        .otherwise({ 
            redirectTo: '/visualizador-del-proceso' 
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

app.run(function($rootScope, $sce, $http, $location, $interval, ArtisterilAuthService, ArtisterilIntervalService, $mdToast) {

    $("body").removeClass('loading');

    $rootScope.$on('$routeChangeStart', function (event, next, prev) 
    {
        // get page slug
        var prevSlug = $rootScope.pageSlug = 'datos-del-sga';
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

        // call enter/exit web service methods
        // console.log(prev.originalPath);
        if (prev && prev.originalPath) {
            switch(prev.originalPath.substring(1)) {
                case "": break;
                case "visualizador-del-proceso"     : $http.get(config.webservice.urls.exit_Process); break;
                case "configuracion-de-parametros"  : $http.get(config.webservice.urls.exit_Parameters); break;
                case "bloqueo-de-productos"         : $http.get(config.webservice.urls.exit_Lockings); break;
                case "informes"                     : $http.get(config.webservice.urls.exit_Informes); break;
                case "maestro-articulos"            : $http.get(config.webservice.urls.exit_MeastroArticulos); break;
                case "ordenes-en-curso"             : $http.get(config.webservice.urls.exit_CurrentOrders); break;
                case "ordenes-completadas"          : $http.get(config.webservice.urls.exit_CompletedOrders); break;
                case "logs"                         : $http.get(config.webservice.urls.exit_Logs); break;
            }
        }
        switch($rootScope.pageSlug) {
            case "": break;
            case "login"                        : $http.get(config.webservice.urls.enter_Login); break;
            case "visualizador-del-proceso"     : $http.get(config.webservice.urls.enter_Process); break;
            case "configuracion-de-parametros"  : $http.get(config.webservice.urls.enter_Parameters); break;
            case "bloqueo-de-productos"         : $http.get(config.webservice.urls.enter_Lockings); break;
            case "informes"                     : $http.get(config.webservice.urls.enter_Informes); break;
            case "maestro-articulos"            : $http.get(config.webservice.urls.enter_MeastroArticulos); break;
            case "ordenes-en-curso"             : $http.get(config.webservice.urls.enter_CurrentOrders); break;
            case "ordenes-completadas"          : $http.get(config.webservice.urls.enter_CompletedOrders); break;
            case "logs"                         : $http.get(config.webservice.urls.enter_Logs); break;
        }
        
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




    $rootScope.toast = $mdToast.simple()
        .hideDelay(10000);
        // .position('bottom left');
        // .parent($('body > main'));


    $rootScope.toggleFullScreen = function() 
    {
        var elem = document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }

});

    



