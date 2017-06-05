var ArtisterilIntervalService = angular.module('ArtisterilIntervalService', [])
.service('ArtisterilIntervalService', function ($rootScope) 
{

	this.intervals = [];

	this.setInterval = function(callback, miliseconds, clearIntervals) 
    {
        if (miliseconds === undefined || !miliseconds) miliseconds = 1000;
        if (clearIntervals === undefined) clearIntervals = true;

        if (clearIntervals) {
            for (i in this.intervals) {
                clearInterval(this.intervals[i]);
            }
            this.intervals = [];
        }

        this.intervals.push(setInterval(callback, miliseconds));
    };

});