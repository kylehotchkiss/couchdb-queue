var queue = require("./couchdb-queue.js");

var worker = new queue({
    /////////////////////////////
    // Enter your Config here! //
    /////////////////////////////
    host: '127.0.0.1', port: '5984', user: '', pass: '', path: '/queue/', wait: ''
}, function( item, callback ) {
    /////////////////////////////////////
    // Here is your Queue Task Runner. //
    // Your data is available in Item  //
    /////////////////////////////////////
    //console.log(item);

    callback(  );
});