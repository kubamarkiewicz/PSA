app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService, $animate) {  


	/* mapa *********************************************************************************/

	$scope.zoom = 1;

	var mapaElement = $('#mapa');

	var defaultFocal = {
		'clientX': mapaElement.parent().width()/2, 
		'clientY': mapaElement.parent().height()/2
	}
	
	$scope.zoomIn = function(focal) 
	{
		$scope.zoom = 1.2 * $scope.zoom;
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':focal === undefined, 
			'focal': focal === undefined ? defaultFocal : focal
		});
	}
	
	$scope.zoomOut = function(focal) 
	{
		$scope.zoom = 1 / 1.2 * $scope.zoom;
		if ($scope.zoom < 1) {
			$scope.zoom = 1;
		}
		mapaElement.panzoom("zoom", $scope.zoom, {
			'animate':focal === undefined, 
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
        	$scope.zoomOut(e);
        }
        else {
        	$scope.zoomIn(e);
        }
    });



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
        	// add data manually, otherwise animation does not work ...
            $scope.AGVData = {};
            for (i in response.data) {
                $scope.AGVData[response.data[i].id] = response.data[i];
                $scope.AGVData[response.data[i].id].x *= (mapWidth / 100);
                $scope.AGVData[response.data[i].id].y *= (mapHeight / 100);
            }
        });
    }
    // $scope.loadAGVData();
    ArtisterilIntervalService.start($scope.loadAGVData);


});