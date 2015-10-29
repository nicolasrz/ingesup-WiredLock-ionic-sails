/**
 * NfcController
 *
 * @description :: Server-side logic for managing nfcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	// a CREATE action  
    create: function(req, res, next) {

        var params = req.params.all();

        Nfc.create(params, function(err, nfc) {

            if (err) return next(err);

            res.status(201);

            res.json(nfc);

        });

    },

    // a FIND action
    find: function(req, res, next) {

        var id = req.param('id');

        var idShortCut = isShortcut(id);

        if (idShortCut === true) {
            return next();
        }

        if (id) {

            nfc.findOne(id, function(err, nfc) {

                if (nfc === undefined) return res.notFound();

                if (err) return next(err);

                res.json(nfc);

            });

        } else {

            var where = req.param('where');

            if (_.isString(where)) {
                where = JSON.parse(where);
            }

            var options = {
                limit: req.param('limit') || undefined,
                skip: req.param('skip') || undefined,
                sort: req.param('sort') || undefined,
                where: where || undefined
            };

            Nfc.find(options, function(err, nfc) {

                if (nfc === undefined) return res.notFound();

                if (err) return next(err);

                res.json(nfc);

            });

        }

        function isShortcut(id) {
            if (id === 'find' || id === 'update' || id === 'create' || id === 'destroy') {
                return true;
            }
        }

    },

    // an UPDATE action
    update: function(req, res, next) {

        var criteria = {};

        criteria = _.merge({}, req.params.all(), req.body);

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        nfc.update(id, criteria, function(err, nfc) {

            if (nfc.length === 0) return res.notFound();

            if (err) return next(err);

            res.json(nfc);

        });

    },

    // a DESTROY action
    destroy: function(req, res, next) {

        var id = req.param('id');

        if (!id) {
            return res.badRequest('No id provided.');
        }

        nfc.findOne(id).done(function(err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            nfc.destroy(id, function(err) {

                if (err) return next(err);

                return res.json(result);
            });

        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to nfcController)
     */
    _config: {}
};

