module.exports = function authenticated(req, res, next) {

    var token = req.headers.authorization || false;
    if (req.isSocket) {
        console.log('La requete est : ', req.body);
        token = req.body.token;
         delete req.body.token;
        console.log('j\'ai cassé ton token ', token)
    }

    if (!token) {
        return res.json(401, {err: "user should be authenticated"})
    }
    User.findOne({token: token}, function (err, user) {
        if (err || !user) return res.json(401, {err: "user should be authenticated"})
        req.user = user;
        req.token = token;
        next();
    })
}