app.controller('VisualizadorDelProcesoController', function($scope, $rootScope, $http, $routeParams, config, ArtisterilIntervalService) {  

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
		$scope.zoom = 0.8333333 * $scope.zoom;
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
/*        $panzoom.panzoom('zoom', zoomOut, {
            increment: 0.1,
            animate: true,
            focal: e
        });*/
    });


});