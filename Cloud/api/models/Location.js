/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            required: true
        },
        doors: {
            collection: 'Door',
            via: 'name'
        },
        user: {
            model: 'User'
        },
        logs: {
            collection: 'Log',
            via: 'location'
        }
    },
    toJSON: function () { // Fonction permettant d’enlever des éléments en clair
        var obj = this.toObject();
        //delete obj.password;
        delete obj.user;
        return obj
    }
};