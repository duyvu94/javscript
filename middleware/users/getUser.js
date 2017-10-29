var requireOption = require('../common').requireOption;

/**
 * Get the user for the userid param
 *  - if there is no such user, redirect to /users
 *  - if there is one, put it on res.tpl.user
 */

module.exports = function (objectrepository) {

    var userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        return next();
    };

};
