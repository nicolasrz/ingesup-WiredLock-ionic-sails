/**
* UserRight.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	owner:{
  		type: 'boolean',
  		required: true
  	},
  	user:{
  		model: 'User'
  	},
  	door:{
  		model: 'Door'
  	}
  }
};

