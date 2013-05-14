var queue = require("./couchdb-queue.js");

var worker = new queue({
    /////////////////////////////
    // Enter your Config here! //
    /////////////////////////////
    host: '', port: '', user: '', pass: '', path: '', wait: ''
}, function( item, callback ) {
    /////////////////////////////////////
    // Here is your Queue Task Runner. //
    // Your data is available in Item  //
    /////////////////////////////////////
    console.log("test");

    callback( true );
});