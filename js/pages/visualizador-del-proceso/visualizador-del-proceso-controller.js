app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast) {  




	/* mapa *********************************************************************************/

    $scope.zoom = 1;

    var mapaElement = $('#mapa');

    var centerFocal = {
        'clientX': mapaElement.parent().width()/2, 
        'clientY': mapaElement.parent().height()/2
    }
    var defaultFocal = centerFocal;

    var defaultZoomRate = 1.2;
	
    $scope.zoomIn = function(focal, animate, zoomRate) 
    {
        $scope.zoom = (zoomRate ? zoomRate : defaultZoomRate) * $scope.zoom;
        if ($scope.zoom > config.map.max_zoom) {
            $scope.zoom = config.map.max_zoom;
        }
        mapaElement.panzoom("zoom", $scope.zoom, {
            'animate':animate === undefined ? true : animate, 
            'focal': focal === undefined ? defaultFocal : focal
        });

        // close popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }
    
    $scope.zoomOut = function(focal, animate, zoomRate) 
    {
        if (focal) {
            defaultFocal = focal;
        }
        $scope.zoom = 1 / (zoomRate ? zoomRate : defaultZoomRate) * $scope.zoom;
        if ($scope.zoom < config.map.min_zoom) {
            $scope.zoom = config.map.min_zoom;
        }
        mapaElement.panzoom("zoom", $scope.zoom, {
            'animate':animate === undefined ? true : animate, 
            'focal': focal === undefined ? defaultFocal : focal
        });

        // close popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }

    var $panzoom = mapaElement.panzoom({
        contain: 'invert'
    });

    // scroll to zoom
    $panzoom.parent().on('mousewheel.focal', function( e ) {
        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        if (zoomOut) {
            $scope.zoomOut(e, false, 1.1);
        }
        else {
            $scope.zoomIn(e, false, 1.1);
        }
    });

    // double click to zoom in
    mapaElement.dblclick(function(e) {
        $scope.zoomIn(e, true, 1.44);
    });

    // on map click
    $("#mapa").on('click touchend', function(event) {
        // close popups
        // $('body.page-visualizador-del-proceso .popup').removeClass('open');
        $scope.deselectAllObjects();

        // console.log($scope.pxToMetersX(event.offsetY) + ' : ' + $scope.pxToMetersY(event.offsetX));
        // console.log($scope.pxToPercentsX(event.offsetX) + ' : ' + $scope.pxToPercentsY(event.offsetY));
    });

    var mainPos = $('body.page-visualizador-del-proceso > main').offset();


    $scope.deselectAllObjects = function() 
    {
        // close all popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
        // deselect all objects
        $('body.page-visualizador-del-proceso #mapa > *').removeClass('selected');
    }


    /* calculate positions on map (convert meters to px) *******************************************/

    var mapImg = $('#mapa img');

    $scope.metersToPxX = function(x)
    {
        return (parseFloat(x) - parseFloat(config.map.offset_x)) * parseFloat(mapImg.width()) / parseFloat(config.map.width);
    }
    
    $scope.metersToPxY = function(y) 
    {
        return parseFloat(mapImg.height()) - (parseFloat(y) - parseFloat(config.map.offset_y)) * parseFloat(mapImg.height()) / parseFloat(config.map.height);
    }

    $scope.pxToMetersX = function(x)
    {
        return parseFloat(x) * parseFloat(config.map.width) / parseFloat(mapImg.width()) - parseFloat(config.map.offset_x);
    }

    $scope.pxToMetersY = function(y) 
    {
        return parseFloat(y) * parseFloat(config.map.height) / parseFloat(mapImg.height()) - parseFloat(config.map.offset_y);
    }

    $scope.calculateRotation = function(angle) 
    {
        return 270 - parseFloat(angle);
    }


    $scope.calculateStorageX = function(x)
    {
        if (x) {
            return (parseFloat(config.map.storage_offset_x) + parseFloat(x)) * parseFloat(mapImg.width()) / parseFloat(config.map.storage_scale_x);
        }
    }
    
    $scope.calculateStorageY = function(y) 
    {
        if (y) {
            return (parseFloat(config.map.storage_offset_y) + parseFloat(y)) * parseFloat(mapImg.width()) / parseFloat(config.map.storage_scale_y);
        }
    }



    /* AGVs *********************************************************************************/

    $scope.AGVData = {};

    $animate.enabled($('.agvs'), false);

    $scope.loadAGVData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_agvs
         })
        .then(function(response) {
            // add keys to array, otherwise animation does not work ...
            $scope.AGVData = {};
            for (i in response.data.get_agvsResult) {
                $scope.AGVData[response.data.get_agvsResult[i].Id] = response.data.get_agvsResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadAGVData);
    // $scope.loadAGVData();

    

    $scope.openAGVPopup = function(event, agv) 
    {
        event.stopPropagation();
        $scope.deselectAllObjects();

        $scope.selectedAGV = agv;
        var popup = $('body.page-visualizador-del-proceso #agv-popup');
        popup.addClass('open')
            .css('left', (event.clientX - mainPos.left) + 'px')
            .css('top', (event.clientY - mainPos.top) + 'px');
    }



    /* Semaphores *********************************************************************************/

    $scope.semaphoresData = {};

    $scope.loadSemaphoresData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_semaphores
         })
        .then(function(response) {
            // add keys to array
            $scope.semaphoresData = {};
            for (i in response.data.get_semaphoresResult) {
                $scope.semaphoresData[response.data.get_semaphoresResult[i].Id] = response.data.get_semaphoresResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadSemaphoresData);
    // $scope.loadSemaphoresData();


    $scope.openSemaphorePopup = function(event, semaphore) 
    {
        event.stopPropagation();
        $scope.deselectAllObjects();
        var target = $(event.target);
        target.addClass('selected');

        $scope.selectedSemaphore = semaphore;
        var popup = $('body.page-visualizador-del-proceso #semaphore-popup');
        popup.addClass('open')
            .css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
            .css('top', (target.offset().top - mainPos.top) + 'px');
    }

    $scope.updateSemaphore = function(id) 
    {
        $rootScope.toast.content('Éxito')
            .toastClass('toast-success');
        $mdToast.show($rootScope.toast);
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }





	/* Transport belts *********************************************************************************/

    $scope.transportBeltsData = {};

    $scope.loadTransportBeltsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_transport_belts
         })
        .then(function(response) {
            // add keys to array
            $scope.transportBeltsData = {};
            for (i in response.data.get_transport_beltsResult) {
                $scope.transportBeltsData[response.data.get_transport_beltsResult[i].Id] = response.data.get_transport_beltsResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadTransportBeltsData);
    // $scope.loadTransportBeltsData();


    $scope.openTransportBeltPopup = function(event, transportBelt) 
    {
        event.stopPropagation();
        $scope.deselectAllObjects();
        var target = $(event.target);
        target.addClass('selected');

        $scope.selectedTransportBelt = transportBelt;
        var popup = $('body.page-visualizador-del-proceso #transport-belt-popup');
        popup.addClass('open')
            .css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
            .css('top', (target.offset().top - mainPos.top) + 'px');
    }

    $scope.updateTransportBelt = function(id) 
    {
        $rootScope.toast.content('Éxito')
            .toastClass('toast-success');
        $mdToast.show($rootScope.toast);
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }



	/* Storage Positions *********************************************************************************/

    // load storage positions coordinates
    $http({
        method  : 'GET',
        url     : "js/pages/visualizador-del-proceso/storage_positions_coordinates.json"
     })
    .then(function(response) {
        $scope.storagePositionsCoordinates = response.data;
    });




    $scope.openPositionPopup = function(event, id) 
    {
        event.stopPropagation();
        $scope.deselectAllObjects();
        var target = $(event.target);
        target.addClass('selected');

    	$scope.selectedPositionId = id;
    	var popup = $('body.page-visualizador-del-proceso #position-popup');
        popup.addClass('open')
    		.css('left', target.offset().left + event.target.getBoundingClientRect().width + 'px')
    		.css('top', (target.offset().top - mainPos.top) + 'px');

        $scope.loadStoragePositionNichesData(id);
    }


    $scope.loadStoragePositionNichesData = function(storage_position_id)
    {
        $scope.storagePositionNichesData = [];
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_storage_position_niches,
            params  : {'storage_position_id' : storage_position_id}
         })
        .then(function(response) {
            $scope.storagePositionNichesData = response.data.get_storage_position_nichesResult;
        });
    }





    // Alerts

    $scope.alertsData = [];
    
    $scope.getAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_alerts
         })
        .then(function(response) {
            $scope.alertsData = response.data.get_alertsResult;
        });
    }
    ArtisterilIntervalService.start($scope.getAlertsData, 60000);
    // $scope.getAlertsData();


    $scope.onCheck = function(id)
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.check_alert,
            params  : {
                'Id' : id
            }
         })
        .then(function(response) {
            $scope.getAlertsData();
        });
    }


});