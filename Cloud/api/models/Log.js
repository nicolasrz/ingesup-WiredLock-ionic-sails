/**
 * Log.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        date: 'date',
        user: {
            model: 'user'
        },
        door: {
            model: 'door'
        },
        info: 'String',
        photo: 'String'
    }
};

