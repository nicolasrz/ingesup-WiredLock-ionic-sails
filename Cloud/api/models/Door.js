/**
* Door.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{
    type:'string',
    required: true
  },
  state:{
    type: 'boolean',
    defaultsTo: 'false'
  },
  owners: {
    collection: 'User',
    via: 'doors'
  },
    logs:{
      collection: 'Log',
      via: 'door'
    }
  },



    afterCreate: function (value, next) {
        console.log('Door afterCreate:');
        console.log(value);
        Log.create({
              info: value.name,
              user: "1",
              door:value.id,
              data: value.createdAt
          }).exec(function(err, recordCreated){
              if(err) return next(err);
              // do somethign with recordCreated if you need to
              // ...
              next();
          })
        next();
    },


};

