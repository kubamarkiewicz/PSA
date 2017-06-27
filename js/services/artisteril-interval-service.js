var ArtisterilIntervalService = angular.module('ArtisterilIntervalService', [])
.service('ArtisterilIntervalService', function ($rootScope) 
{
    this.defaultMilliseconds = 1000;

	this.intervals = {};

    this.start = function(callback, miliseconds) 
    {
        if (miliseconds === undefined || !miliseconds) miliseconds = this.defaultMilliseconds;

        // call it now
        callback();

        // stop interval if exists
        if (this.intervals[callback.name]) {
            clearInterval(this.intervals[callback.name]);
        }

        // start interval
        this.intervals[callback.name] = setInterval(callback, miliseconds);
    };


	this.stop = function(callback) 
    {
        if (this.intervals[callback.name]) {
            clearInterval(this.intervals[callback.name]);
        }
    };


    this.stopAll = function() {
        for (i in this.intervals) {
            clearInterval(this.intervals[i]);
        }
        this.intervals = [];
    };

});