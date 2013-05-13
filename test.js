var queue = require("./couchdb-queue.js");

var worker = new queue({
    host: '',
    port: '',
    user: '',
    pass: '',
    dburl: ''
}, function( item, callback ) {
    console.log("test");

    callback();
});