'use strict';

const Hapi = require('hapi');


const server = new Hapi.Server({
    debug: {
        request: ['error'],
        log: ['error']
    }
});

server.connection({ port: 4000 });



server.register(require('vision'), (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        helpersPath: 'templates/helpers',
        partialsPath: 'templates/partials',
        path: 'templates',
        layout: true,
        isCached: false
    });

    R.connect({ db: 'pingoo' }, (err, conn) => {

        if (err) {
            throw err;
        }

        server.app.db = conn;

        server.start((err) => {

            if (err) {
                throw err;
            }
            console.log('Server started at: ' + server.info.uri);
        });
    });
});
