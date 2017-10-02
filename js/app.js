
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
        .when('/logs', { 
            controller: 'LogsController', 
            templateUrl: 'js/pages/logs/index.html' 
        })    
        .when('/ubications', { 
            controller: 'UbicationsController', 
            templateUrl: 'js/pages/ubications/index.html' 
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

    


app.factory('exportUiGridService', exportUiGridService);

exportUiGridService.inject = ['uiGridExporterService'];

function exportUiGridService(uiGridExporterService) {
    var service = {
        exportToExcel: exportToExcel
    };

    return service;

    function Workbook() {
        if (!(this instanceof Workbook)) return new Workbook();
        this.SheetNames = [];
        this.Sheets = {};
    }

    function exportToExcel(sheetName, gridApi, rowTypes, colTypes) {
        var columns = gridApi.grid.options.showHeader ? uiGridExporterService.getColumnHeaders(gridApi.grid, colTypes) : [];
        var data = uiGridExporterService.getData(gridApi.grid, rowTypes, colTypes);
        var fileName = gridApi.grid.options.exporterExcelFilename ? gridApi.grid.options.exporterExcelFilename : 'documento';
        fileName += '.xlsx';
        var wb = new Workbook(),
            ws = sheetFromArrayUiGrid(data, columns);
        wb.SheetNames.push(sheetName);
        wb.Sheets[sheetName] = ws;
        var wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'binary'
        });
        saveAs(new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        }), fileName);
    }

    function sheetFromArrayUiGrid(data, columns) {
        var ws = {};
        var range = {
            s: {
                c: 10000000,
                r: 10000000
            },
            e: {
                c: 0,
                r: 0
            }
        };
        var C = 0;
        columns.forEach(function (c) {
            var v = c.displayName || c.value || columns[i].name;
            addCell(range, v, 0, C, ws);
            C++;
        }, this);
        var R = 1;
        data.forEach(function (ds) {
            C = 0;
            ds.forEach(function (d) {
                var v = d.value;
                addCell(range, v, R, C, ws);
                C++;
            });
            R++;
        }, this);
        if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
        return ws;
    }
    /**
     * 
     * @param {*} data 
     * @param {*} columns 
     */

    function datenum(v, date1904) {
        if (date1904) v += 1462;
        var epoch = Date.parse(v);
        return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    function addCell(range, value, row, col, ws) {
        if (range.s.r > row) range.s.r = row;
        if (range.s.c > col) range.s.c = col;
        if (range.e.r < row) range.e.r = row;
        if (range.e.c < col) range.e.c = col;
        var cell = {
            v: value
        };
        if (cell.v == null) cell.v = '-';
        var cell_ref = XLSX.utils.encode_cell({
            c: col,
            r: row
        });

        if (typeof cell.v === 'number') cell.t = 'n';
        else if (typeof cell.v === 'boolean') cell.t = 'b';
        else if (cell.v instanceof Date) {
            cell.t = 'n';
            cell.z = XLSX.SSF._table[14];
            cell.v = datenum(cell.v);
        } else cell.t = 's';

        ws[cell_ref] = cell;
    }
}

