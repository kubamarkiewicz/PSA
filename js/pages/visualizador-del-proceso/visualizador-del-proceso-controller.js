app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate, $mdToast) {  

    var toast = $mdToast.simple()
            .hideDelay(3000)
            .position('top left')
            .parent($('body > main'));



    // Popup Alerts

    $scope.popupAlertsData = [];

    $scope.getPopupAlertsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_popup_alerts
         })
        .then(function(response) {
            $scope.popupAlertsData = {};
            for (i in response.data.get_popup_alertsResult) {
                $scope.popupAlertsData[response.data.get_popup_alertsResult[i].Title + response.data.get_popup_alertsResult[i].Message] = response.data.get_popup_alertsResult[i];
            }
        });
    }
    // ArtisterilIntervalService.start($scope.getPopupAlertsData);





	/* mapa *********************************************************************************/

	$scope.zoom = 1;
	$scope.minZoom = 1;
	$scope.maxZoom = 5;

	var mapaElement = $('#mapa');

	var defaultFocal = {
		'clientX': mapaElement.parent().width()/2, 
		'clientY': mapaElement.parent().height()/2
	}
	
	$scope.zoomIn = function(focal, animate) 
	{
		$scope.zoom = 1.2 * $scope.zoom;
		if ($scope.zoom > $scope.maxZoom) {
			$scope.zoom = $scope.maxZoom;
		}
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':animate === undefined ? true : animate, 
			'focal': focal === undefined ? defaultFocal : focal
		});

        // close popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
	}
	
	$scope.zoomOut = function(focal, animate) 
	{
		$scope.zoom = 1 / 1.2 * $scope.zoom;
		if ($scope.zoom < $scope.minZoom) {
			$scope.zoom = $scope.minZoom;
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
        	$scope.zoomOut(e, false);
        }
        else {
        	$scope.zoomIn(e, false);
        }
    });

    // double click to zoom in
    mapaElement.dblclick(function(e) {
    	$scope.zoomIn(e, true);
    	$scope.zoomIn(e, true);
	});

    // on map click
    $scope.mapClick = function(event) 
    {
        // close all popups
        $('body.page-visualizador-del-proceso .popup').removeClass('open');

        console.log($scope.pxToMetersX(event.offsetX) + ' : ' + $scope.pxToMetersY(event.offsetY));
    }

    var mainPos = $('body.page-visualizador-del-proceso > main').offset();



    /* calculate positions on map (convert meters to px) *******************************************/

    var mapImg = $('#mapa img');

    $scope.metersToPxX = function(x)
    {
        return (parseFloat(config.map.offset_x) + parseFloat(x)) * parseFloat(mapImg.width()) / parseFloat(config.map.width);
    }
    
    $scope.metersToPxY = function(y) 
    {
        return (parseFloat(config.map.offset_y) + parseFloat(y)) * parseFloat(mapImg.height()) / parseFloat(config.map.height);
    }

    $scope.pxToMetersX = function(x)
    {
        return parseFloat(x) * parseFloat(config.map.width) / parseFloat(mapImg.width()) - parseFloat(config.map.offset_x);
    }

    $scope.pxToMetersY = function(y) 
    {
        return parseFloat(y) * parseFloat(config.map.height) / parseFloat(mapImg.height()) - parseFloat(config.map.offset_y);
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
                $scope.AGVData[response.data.get_agvsResult[i].id] = response.data.get_agvsResult[i];
            }
        });
    }
    ArtisterilIntervalService.start($scope.loadAGVData);


    

    $scope.openAGVPopup = function(event, agv) 
    {
        event.stopPropagation();

        $scope.selectedAGV = agv;
        var popup = $('body.page-visualizador-del-proceso #agv-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
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
            $scope.semaphoresData = response.data.get_semaphoresResult;
        });
    }
    // ArtisterilIntervalService.start($scope.loadSemaphoresData);
    $scope.loadSemaphoresData();


    $scope.openSemaphorePopup = function(event, semaphore) 
    {
        event.stopPropagation();

        $scope.selectedSemaphore = semaphore;
        var popup = $('body.page-visualizador-del-proceso #semaphore-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
            .css('left', (event.clientX - mainPos.left) + 'px')
            .css('top', (event.clientY - mainPos.top) + 'px');
    }

    $scope.updateSemaphore = function(id) 
    {
        toast.content('Éxito')
            .toastClass('toast-success');
        $mdToast.show(toast);
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }





	/* Transport belts *********************************************************************************/

    $scope.transportBeltsData = {};

    $scope.loadTransportBeltsData = function()
    {
        // $http({
        //     method  : 'GET',
        //     url     : config.webservice.urls.get_transport_belts
        //  })
        // .then(function(response) {
        // 	// console.log(response.data);
        // 	$scope.transportBeltsData = response.data.get_transport_beltsResult;
        // });
    }
    // ArtisterilIntervalService.start($scope.loadTransportBeltsData);
    $scope.loadTransportBeltsData();


    $scope.openTransportBeltPopup = function(event, transportBelt) 
    {
        event.stopPropagation();

        $scope.selectedTransportBelt = transportBelt;
        var popup = $('body.page-visualizador-del-proceso #transport-belt-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
            .css('left', (event.clientX - mainPos.left) + 'px')
            .css('top', (event.clientY - mainPos.top) + 'px');
    }

    $scope.updateTransportBelt = function(id) 
    {
        toast.content('Éxito')
            .toastClass('toast-success');
        $mdToast.show(toast);
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
    }



	/* Storage Positions *********************************************************************************/

    $scope.loadStoragePositionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_storage_positions
         })
        .then(function(response) {
            $scope.storagePositionsData = response.data.get_storage_positionsResult;
        });
    }
    $scope.loadStoragePositionsData();


    // load storage positions coordinates
    $http({
        method  : 'GET',
        url     : config.map.coordinates_urls.storage_positions
     })
    .then(function(response) {
        $scope.storagePositionsCoordinates = response.data;
    });


    

    $scope.openPositionPopup = function(event, position) 
    {
        event.stopPropagation();

    	$scope.selectedPosition = position;
    	var popup = $('body.page-visualizador-del-proceso #position-popup');
        $('body.page-visualizador-del-proceso .popup').not(popup).removeClass('open');
        popup.addClass('open')
    		.css('left', (event.clientX - mainPos.left) + 'px')
    		.css('top', (event.clientY - mainPos.top) + 'px');

        $scope.loadStoragePositionNichesData(position.id);
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

});