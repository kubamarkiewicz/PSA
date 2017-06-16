app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate) {  


    var mainPos = $('body.page-visualizador-del-proceso > main').offset();

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


    $scope.mapClick = function() 
    {
        console.log('mapClick');
        $('body.page-visualizador-del-proceso .popup').removeClass('open');
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
        	var mapWidth = $('#mapa img').width();
        	var mapHeight = $('#mapa img').height();
        	// console.log(response.data);
        	// add keys to array, otherwise animation does not work ...
            $scope.AGVData = {};
            for (i in response.data.get_agvsResult) {
                var item = response.data.get_agvsResult[i];
                item.x *= mapWidth / 100;
                item.y *= mapHeight / 100;
                $scope.AGVData[item.id] = item;
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



	/* Storage Positions *********************************************************************************/

    $scope.loadStoragePositionsData = function()
    {
        $http({
            method  : 'GET',
            url     : config.webservice.urls.get_storage_positions
         })
        .then(function(response) {
        	// console.log(response.data);
            $scope.storagePositionsData = response.data;
        });
    }
    $scope.loadStoragePositionsData();


    

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
            // console.log(response.data);
            $scope.storagePositionNichesData = response.data;
        });
    }

});