var requireOption = require('../common').requireOption;

/**
 * Get the user for the userid param
 *  - if there is no such user, redirect to /users
 *  - if there is one, put it on res.tpl.user
 */

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        //not enought parameter
        if ((typeof req.session === 'undefined') || (req.session.userid === 'null')) {
            return next();
        }

        //lets find the user
        userModel.findOne({_id: req.session.userid}, function (err, result) {
            if (err) {
                return next(err);
            }

            res.tpl.user = result;

            return next();
        });
    };

};
