var RunnerJS = require('./runner');
var modules = {};
modules['request'] = require('request');

var TIMEOUT = 5*1000;

var classes = {
    Buffer: Buffer
}

var fireCallback = function(callback, timer, error, result) {
    if (timer) {
        clearTimeout(timer);
        if (error) {
            callback(error);
        }
        else {
            callback(undefined, result);
        }
    }
    return undefined;
}


var runWrapper = function(source, options, callback) {
    var sandbox = RunnerJS.createSandbox(console, modules, classes);
    sandbox.Fuse = {
        data: require('../examples/uplink.json'),
        options: options,
        error: (err) => {
            timer = fireCallback(callback, timer, err && err instanceof Error ? err.message : err);
        },
        reply: (res) => {
            if (res == undefined) {
                res = {}
            };
    
            if (res.status == undefined) {
                res.status = 200;
            }
    
            timer = fireCallback(callback, timer, undefined, res);
        }
    };
    
    var context = RunnerJS.createContext(sandbox);
    
    timer = setTimeout(() => {
        timer = fireCallback(callback, timer, "Fuse timeout", undefined);
    }, TIMEOUT);

    var program = {
        name: 'function.js',
        source: source
    }

    var start = new Date().getTime();

    RunnerJS.parse(program, function() {
        RunnerJS.execute(program, context, TIMEOUT, function(err){
            if (err) {
                timer = fireCallback(callback, timer, err, undefined);
            }

            var end = new Date().getTime();
            console.log('Function executed in: %s ms', end-start);
        });
    });
}

exports.runWrapper = runWrapper;