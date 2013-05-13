var queue = require("./couchdb-queue.js");

var worker = new queue({
    host: '', port: '', user: '', pass: '', path: ''
}, function( item, callback ) {
    /////////////////////////////////////
    // Here is your Queue Task Runner. //
    // Your data is available in Item  //
    /////////////////////////////////////
    console.log("test");

    callback( true );
});