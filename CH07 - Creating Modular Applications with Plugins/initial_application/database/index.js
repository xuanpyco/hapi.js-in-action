'use strict';

const R = require('rethinkdb');

module.exports.register = function (server, options, next) {

    // Database

    server.method({
        name: 'database.getRecent',
        method: function (callback) {

            R
            .table('pings')
            .orderBy(R.desc('timestamp'))
            .run(server.app.db, (err, cursor) => {

                if (err) {
                    throw err;
                }

                cursor.toArray(callback);
            });
        }
    });

    server.method({
        name: 'database.getFlight',
        method: function (code, callback) {

            R
            .table('pings')
            .filter({ code: code })
            .orderBy(R.desc('timestamp'))
            .run(server.app.db, (err, cursor) => {

                if (err) {
                    throw err;
                }

                cursor.toArray(callback);
            });
        }
    });

    server.method({
        name: 'database.addPing',
        method: function (payload, callback) {

            R
            .table('pings')
            .insert(payload)
            .run(server.app.db, (err) => {

                if (err) {
                    throw err;
                }

                callback();
            });
        }
    });

    next();
}