//import tina module
var tina = require('tina-bootstrap');

/*
 * function : file path to function.js, which should contain the integration code
 * settings : any settings necessary for tina to work with the integration
 * credentials : api key, access token, etc. for integrated api
 */
tina.setup({
function: "",
settings: { "database": ""},
credentials: { "access_token": ""}
});

tina.run();