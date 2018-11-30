var VM = require('vm');

const ANONYMOUS_FILE = "anonymous.js";
const TIMEOUT = 10;

function isString(obj) {
    return typeof(obj) == 'string' || obj instanceof String;
}

function ScriptingError(err, filename) {
    this.name = err.name;
    this.stack = err.stack;
    this.filename = filename;

    if (err instanceof SyntaxError) {
        this.message = err.stack.split('\n').slice(0, 4).join('\n');
    }
    else {
        this.message = err.stack.split('\n').slice(0, 2).join('\n');
    }
}

ScriptingError.prototype = Object.create(Error.prototype);
ScriptingError.prototype.constructor = ScriptingError;

ScriptingError.prototype.toString = function() {
    return this.message;
}

function createSandbox(logger, modules, classes) {
    var sandbox = {
        require: (m) => {
            if (modules) {
                return modules[m];
            }
            return undefined;
        },
        console: logger,
        module: {
            exports: {}
        },
    };

    if (classes) {
        for (var c in classes) {
            sandbox[c] = classes[c];
        }
    }

    return sandbox;
}

function createContext(sandbox) {
    return VM.createContext(sandbox);
}

function parse(program, callback) {
    var source;

    /* Program Object */
    if (program && program.source && program.source.length > 0) {
        source = program.source;
    }

    /* String */
    else if (isString(program) && program.length > 0) {
        source = program;
    }

    else {
        return callback();
    }

    var options = {
        filename: program.name || ANONYMOUS_FILE,
        displayErrors: true,
    };

    try {
        program.script = new VM.Script(program.source, options);
    }
    catch (err) {
        return callback(new ScriptingError(err, options.filename));
    }
    return callback();
}

function execute(program, context, timeout, callback) {
    if ((program == undefined) || (program.script == undefined)) {
        return callback();
    }

    var options = {
        filename: program.name || ANONYMOUS_FILE,
        timeout: timeout
    };

    try {
        program.script.runInContext(context, options);
        callback();
    } catch (err) {
        return callback(new ScriptingError(err, program.name));
    }
}

module.exports = {
    parse: parse,
    execute: execute,
    createSandbox: createSandbox,
    createContext: createContext
}
