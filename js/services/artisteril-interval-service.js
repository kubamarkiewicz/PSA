var ArtisterilIntervalService = angular.module('ArtisterilIntervalService', [])
.service('ArtisterilIntervalService', function ($rootScope) 
{
    this.defaultMilliseconds = 1000;

	this.intervals = [];

    this.start = function(callback, miliseconds) 
    {
        if (miliseconds === undefined || !miliseconds) miliseconds = this.defaultMilliseconds;

        // call it now
        callback();

        // start interval
        this.intervals.push(setInterval(callback, miliseconds));
    };


    this.stopAll = function() {
        for (i in this.intervals) {
            clearInterval(this.intervals[i]);
        }
        this.intervals = [];
    };


    this.functionToString = function(callback)
    {

    }

});