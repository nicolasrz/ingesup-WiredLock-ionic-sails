/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribeToLocation : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var userId = req.param('userId');
        console.log('je passe ici dans le controleur des locations')
        Locations.find({location:userId}).populate('logs').exec(
            function(err,Locations){
                if(err)return res.error()
                Location.subscribe(req, _.pluck(Locations,'id'))
                return res.json(Locations)
            }
        )
    }
};