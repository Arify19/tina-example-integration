var runit = require('./lib/bootstrap');
var fs = require('fs');
var fx = fs.readFileSync(__dirname + '/function.js');
const source = fx.toString();
const options = {
    credentials: {
        access_token: ''
    },
    fuse_settings: {
        apikey: 'abc123'
    },
};

runit.runWrapper(source, options, function(err, result){
    if (err) {
        throw err;
    }

    console.log(result);
});