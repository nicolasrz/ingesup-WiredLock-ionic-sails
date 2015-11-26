/**
 * DoorController
 *
 * @description :: Server-side logic for managing doors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subscribeToDoor : function(req,res){

    },

    findByUser : function(req,res){
        if(!req.isSocket)return res.json(401,{err:'is not a socket request'});
        var userId = req.param('userId');
        console.log('je passe ici dans le controleur des Doors' + userId)
        //Doors.find({"owners":{"id":userId}}).populate('logs').exec(
        Door.query('SELECT du.door_owners FROM  door_owners__user_doors as du WHERE du.user_doors = ' +userId,
            function(err,Doors){
                console.log(Doors)
                if(err){
                    return res.error()
                }
                Door.subscribe(req, _.pluck(Doors,'door_owners'))
                return res.json(_.pluck(Doors,'door_owners'))
            });

    }
};