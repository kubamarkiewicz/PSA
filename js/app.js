
var app = angular.module("myApp", [
    "ngRoute",
    "ngMaterial",
    'ArtisterilIntervalService',
    'ArtisterilAuthService',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.exporter'
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
        .when('/informes/ocupacion-de-estanterias', { 
            controller: 'OcupacionDeEstanteriasController', 
            templateUrl: 'js/pages/informes/ocupacion-de-estanterias.html' 
        })   
        .when('/informes/stock-por-referencia', { 
            controller: 'StockPorReferenciaController', 
            templateUrl: 'js/pages/informes/stock-por-referencia.html' 
        })   
        .when('/informes/stock-por-proveedor', { 
            controller: 'StockPorProveedorController', 
            templateUrl: 'js/pages/informes/stock-por-proveedor.html' 
        })   
        .when('/informes/movimientos-por-referencia', { 
            controller: 'MovimientosPorReferenciaController', 
            templateUrl: 'js/pages/informes/movimientos-por-referencia.html' 
        })   
        .when('/informes/movimientos-por-hora', { 
            controller: 'MovimientosPorHoraController', 
            templateUrl: 'js/pages/informes/movimientos-por-hora.html' 
        })   
        .when('/informes/ubications', { 
            controller: 'UbicationsInformeController', 
            templateUrl: 'js/pages/informes/ubications.html' 
        })   
        .when('/informes/alertas', { 
            controller: 'AlertasController', 
            templateUrl: 'js/pages/informes/alertas.html' 
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
        .when('/logs', { 
            controller: 'LogsController', 
            templateUrl: 'js/pages/logs/index.html' 
        })    
        .when('/ubications', { 
            controller: 'UbicationsController', 
            templateUrl: 'js/pages/ubications/index.html' 
        })    
        .when('/camaras', { 
            controller: 'CamarasController', 
            templateUrl: 'js/pages/camaras/index.html' 
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
        // find page slug
        var prevSlug = $rootScope.pageSlug = 'datos-del-sga';
        if (next.originalPath && next.originalPath.substring(1)) {
            $rootScope.pageSlug = next.originalPath.substring(1);
            // substring until first slash
            if ($rootScope.pageSlug.indexOf('/') != -1) {
                $rootScope.pageSlug = $rootScope.pageSlug.substr(0, $rootScope.pageSlug.indexOf('/'));
            }
        }
        console.log($rootScope.pageSlug);

        // auth
        ArtisterilAuthService.auth($rootScope.pageSlug);

        // set body class "page-slug"
        $("body")
        .removeClass(function (index, className) {
            return (className.match (/(^|\s)page-\S+/g) || []).join(' ');
        })
        .addClass("page-"+$rootScope.pageSlug);

        // select menu item
        var selectedItem = $('#menu-dropdown .md-button[href^="#' + $rootScope.pageSlug + '"]');
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



    // global toast
    $rootScope.toast = $mdToast.simple()
        .hideDelay(10000);
        // .position('bottom left');
        // .parent($('body > main'));



    // full screen
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

  


app.config(function($mdDateLocaleProvider) {
    // Example of a Spanish localization.
    $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                                                                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
                                                                    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
    $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    // Optional.
    //$mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,
    //                               20,21,22,23,24,25,26,27,28,29,30,31];
    // In addition to date display, date components also need localized messages
    // for aria-labels for screen-reader users.
    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
        return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
    $mdDateLocaleProvider.formatDate = function(date) {
        if (!date) {
            return '';
        }
        var day = ("0" + date.getDate()).slice(-2);
        var monthIndex = ("0" + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();

        return day + '/' + monthIndex + '/' + year;
    };
});



app.directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value);
            });
        }
    };
});
