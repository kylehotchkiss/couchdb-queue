/**
 *
 * couchdb-queue
 * Copyright 2013 Kyle Hotchkiss
 * Released under the GPL
 *
 * Below is Theoritcal Implementation
 * Many iterations say that memory leaks are not an issue
 *
 * setInterval but for couchdb-queue
 *
 * How do we handle passing DB and queue sources? Config object?
 *
 */
var couchdb = require('couchdb-simple');

var queue = function( database, inputCode ) {
    ///////////////////////////
    // CouchDB Initalization //
    ///////////////////////////
    var db_host = database.host;
    var db_port = database.port;
    var db_user = database.user;
    var db_pass = database.pass;
    var db_path = database.path;

    var database = new couchdb( db_host, db_port, db_user, db_pass );

    var loop = function() {
        //////////////////////////////////////
        // Looping Code, With Batch Execute //
        //////////////////////////////////////
        database.read( db_path, function( results, error ) {

            if ( typeof error !== "undefined" && error ) {
                //////////////////////////////
                // Production-safe Failsafe //
                //////////////////////////////
                sleep();
            } else {
                var batch = async.queue( function( task, callback ) {
                    /////////////////////////////////////////////////
                    // Break apart the CouchDB object, use as Task //
                    /////////////////////////////////////////////////
                    var taskID = task.id;
                    var taskItem = task.doc;

                    inputCode( taskItem, function() {
                        //////////////////////////////////
                        // Local (async.queue) Callback //
                        //////////////////////////////////

                        // we should handle getting rid of queue items too
                        // unless persist is specificifed which will be handled in the next iteration
                        callback();
                    });
                });

                batch.push( results.rows );

                batch.drain = function() {
                    ///////////////////
                    // Exit the Loop //
                    ///////////////////
                    sleep();
                }
            }

        });
    }

    var advance = function() {
        /////////////////////////////////////////////
        // Immediately Reiterate, Used for Startup //
        /////////////////////////////////////////////
        setImmediate(function() {
            loop();
        });
    }

    var sleep = function() {
        ////////////////////////////////////////////
        // Reiterate after a designated Wait time //
        ////////////////////////////////////////////
        setImmediate(function() {
            setTimeout(function() {
                loop();
            }, 1000);
        })
    }

    advance();
}

////////////////////////
// Node Module Export //
////////////////////////
module.exports = queue;