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
            model: 'User'
        },
        door: {
            model: 'Door'
        },
        location: {
            model: 'Location'
        },
        info: 'String',
        photo: 'String'
    }
};

