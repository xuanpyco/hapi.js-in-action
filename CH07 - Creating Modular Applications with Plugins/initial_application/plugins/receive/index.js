'use strict';

const Joi = require('joi');

module.exports.register = function (server, options, next) {
    
    server.route({
        config: {
            validate: {
                payload: {
                    code: Joi.string().required(),
                    lat: Joi.number().required(),
                    lng: Joi.number().required(),
                    alt: Joi.number().required(),
                    timestamp: Joi.date().required()
                }
            }
        },
        method: 'POST',
        path: '/api',
        handler: function (request, reply) {

            server.methods.database.addPing(request.payload, reply);
        }
    });

    next();
};


module.exports.attributes = {
    pkg: require ('./package')
}